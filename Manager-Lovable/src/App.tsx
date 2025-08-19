import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import Maintenance from "./pages/Maintenance";
import Inquiries from "./pages/Inquiries";
import PaymentHistory from "./pages/PaymentHistory";
import Feedback from "./pages/Feedback";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/properties" element={<DashboardLayout><Properties /></DashboardLayout>} />
          <Route path="/add-property" element={<DashboardLayout><AddProperty /></DashboardLayout>} />
          <Route path="/maintenance" element={<DashboardLayout><Maintenance /></DashboardLayout>} />
          <Route path="/inquiries" element={<DashboardLayout><Inquiries /></DashboardLayout>} />
          <Route path="/payments" element={<DashboardLayout><PaymentHistory /></DashboardLayout>} />
          <Route path="/feedback" element={<DashboardLayout><Feedback /></DashboardLayout>} />
          <Route path="/notifications" element={<DashboardLayout><Notifications /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
