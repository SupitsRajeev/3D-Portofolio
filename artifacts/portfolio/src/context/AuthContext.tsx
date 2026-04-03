import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const SESSION_KEY = "portfolio-admin-session";

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      const expectedUser = import.meta.env.VITE_ADMIN_USER ?? "admin";
      const expectedHash = import.meta.env.VITE_ADMIN_PASS_HASH ?? "";
      const inputHash = await sha256(password);
      if (username === expectedUser && inputHash === expectedHash) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setIsAuthenticated(true);
        return true;
      }
      return false;
    },
    [],
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
