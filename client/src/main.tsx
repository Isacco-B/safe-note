import { createRoot } from "react-dom/client";
import { ShieldCheck } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

import App from "./App.tsx";
import "./index.css";
import { ModeToggle } from "./components/mode-toggle.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <main className="min-h-[100vh] p-6 max-w-6xl mx-auto">
      <nav className="bg-white dark:bg-background bg-opacity-95 fixed w-full z-50 top-0 left-0">
        <div className="flex flex-row justify-between items-center p-4 max-w-6xl mx-auto">
            <div className="flex flex-row space-x-2 items-center cursor-pointer" onClick={() => window.location.reload()}>
              <ShieldCheck
                size={38}
                className="text-[#404040] dark:text-neutral-200"
              />
              <h1 className="font-poppins font-bold text-2xl text-neutral-700 dark:text-neutral-200">
                Safe
                <span className="font-poppins font-bold text-neutral-400 dark:text-neutral-300 ml-1">
                  Note
                </span>
              </h1>
            </div>
          <ModeToggle />
        </div>
      </nav>
      <div className="mt-14 md:mt-24">
        <App />
      </div>
      <Toaster />
    </main>
  </ThemeProvider>
);
