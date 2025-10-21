import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@bhulaxmi.com"; // change this to your email
const ADMIN_PASSWORD = "bhulaxmi123"; // change this to a strong password

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin", "true");
      toast.success("Welcome back, Admin!");
      window.location.href = "/admin"; // Redirect to dashboard
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-amber-100 dark:border-gray-700"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="p-3 bg-amber-100 rounded-full mb-3">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-amber-700">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/50 dark:bg-gray-800"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/50 dark:bg-gray-800"
          />

          <Button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
          >
            <LogIn className="w-4 h-4 mr-2" /> Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
