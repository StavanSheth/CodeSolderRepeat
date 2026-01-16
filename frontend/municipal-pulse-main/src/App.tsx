import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TruckView from "./pages/TruckView";
import CityCommandCentre from "./pages/CityCommandCentre";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import WasteIntelligence from "./pages/WasteIntelligence";
import CorporatePartnerships from "./pages/CorporatePartnerships";
import CityForecasting from "./pages/CityForecasting";
import CitizenEngagement from "./pages/CitizenEngagement";
import ImpactMetrics from "./pages/ImpactMetrics";
import LiveOperations from "./pages/LiveOperations";
import ContractorsDashboard from "./pages/ContractorsDashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/command-centre" element={<CityCommandCentre />} />
          <Route path="/waste-intelligence" element={<WasteIntelligence />} />
          <Route path="/forecasting" element={<CityForecasting />} />
          <Route path="/corporate-partnerships" element={<CorporatePartnerships />} />
          <Route path="/citizen-engagement" element={<CitizenEngagement />} />
          <Route path="/impact-metrics" element={<ImpactMetrics />} />
          <Route path="/live-operations" element={<LiveOperations />} />
          <Route path="/revenue" element={<TruckView />} />
          <Route path="/truck" element={<TruckView />} />
          <Route path="/dustbin-tracking" element={<TruckView />} />
           <Route path="/contractors" element={<ContractorsDashboard />} />
          <Route path="/collection" element={<PlaceholderPage title="Collection & Transport" />} />
          <Route path="/processing" element={<PlaceholderPage title="Processing Facilities" />} />
          <Route path="/landfill" element={<PlaceholderPage title="Landfill Management" />} />
          <Route path="/complaints" element={<PlaceholderPage title="Complaints & Enforcement" />} />
          <Route path="/planning" element={<PlaceholderPage title="Planning & Forecasting" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports & Compliance" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
