import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const requireAuth = ClerkExpressWithAuth();
export default requireAuth;
