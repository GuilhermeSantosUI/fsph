import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './views/pages/auth';
import CommunityPage from './views/pages/community';
import { HomePage } from './views/pages/homepage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        {/* login */}
        <Route path="/login" element={<Auth />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
