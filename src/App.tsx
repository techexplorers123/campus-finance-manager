import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SchoolProvider } from "@/context/SchoolContext";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { StudentsPage } from "@/components/students/StudentsPage";
import { ClassesPage } from "@/components/classes/ClassesPage";
import { StaffPage } from "@/components/staff/StaffPage";
import { TransportPage } from "@/components/transport/TransportPage";
import { PaymentsPage } from "@/components/payments/PaymentsPage";
import { ExpensesPage } from "@/components/expenses/ExpensesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SchoolProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/classes" element={<ClassesPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/payments" element={<PaymentsPage />} />
              <Route path="/expenses" element={<ExpensesPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SchoolProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
