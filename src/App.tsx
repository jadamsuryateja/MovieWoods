import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { CursorProvider } from "@/context/CursorContext";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import Loader from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(() => {
    return sessionStorage.getItem('hasSeenLoader') !== 'true';
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('hasSeenLoader', 'true');
    setIsAppLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CursorProvider>
          <Toaster />
          <Sonner />

          {isAppLoading && <Loader onComplete={handleLoaderComplete} />}

          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
          </BrowserRouter>
        </CursorProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
