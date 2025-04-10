import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.auth.userId });
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = new Task({
      userId: req.auth.userId,
      title: req.body.title,
    });
    const saved = await task.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.auth.userId },
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.auth.userId });
    res.status(200).json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Error deleting task" });
  }
};
