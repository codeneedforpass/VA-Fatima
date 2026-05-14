import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkSamplesPage from './pages/WorkSamplesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/work" element={<WorkSamplesPage />} />
    </Routes>
  );
}
