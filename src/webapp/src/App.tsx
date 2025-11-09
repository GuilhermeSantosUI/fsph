import { Sidebar } from "./views/components/sidebar";
import { Header } from "./views/components/header";
import { CampaignsPage } from "./views/pages/campaigns";

export function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <CampaignsPage />
      </div>
    </div>
  );
}
