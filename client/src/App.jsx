import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

function TaskDashboard() {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const token = await getToken();
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleCreate = async () => {
    const token = await getToken();
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    fetchTasks();
  };

  const toggleComplete = async (id, currentStatus) => {
    const token = await getToken();
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { completed: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleCreate}>
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`flex justify-between items-center p-3 border ${
            task.completed ? "bg-green-100 line-through" : ""
          }`}
        >
          <span>{task.title}</span>
          <button
            onClick={() => toggleComplete(task._id, task.completed)}
            className="text-sm text-blue-500"
          >
            {task.completed ? "Undo" : "Done"}
          </button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <header className="p-4 shadow flex justify-between items-center bg-white">
        <h1 className="text-xl font-bold">📝 Task Tracker</h1>
        <UserButton />
      </header>

      <main className="p-6">
        <SignedOut>
          <div className="flex justify-center items-center gap-8"> {/* Adjusted gap to 8 */}
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <h2 className="text-center text-2xl font-semibold mb-4">Sign In</h2>
              <SignIn />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
              <SignUp />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <TaskDashboard />
        </SignedIn>
      </main>
    </div>
  );
}

export default App;
