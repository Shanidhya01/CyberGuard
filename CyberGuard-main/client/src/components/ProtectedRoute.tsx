// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
}
// Anywhere inside a protected page/component
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

<button onClick={() => signOut(auth)} className="text-red-600">Logout</button>
