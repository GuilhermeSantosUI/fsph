import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './views/pages/homepage';

export function App() {
  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}
