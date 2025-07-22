
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Determine the base URL for routing based on environment
const getBasename = () => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.includes('/home')) {
      return '/home';
    } else if (pathname.includes('/dashboard')) {
      return '/dashboard';
    }
  }
  return '/';
};

function App() {
  const basename = getBasename();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={basename.includes('/dashboard') ? <Dashboard /> : <Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
