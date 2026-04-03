import { useAuth } from "@/context/AuthContext";
import { AdminLogin } from "@/components/AdminLogin";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <AdminLogin />;
  return <Component />;
}
