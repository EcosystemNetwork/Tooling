import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Scenes from './pages/Scenes';
import Shaders from './pages/Shaders';
import Snippets from './pages/Snippets';
import Assets from './pages/Assets';
import Performance from './pages/Performance';
import Builds from './pages/Builds';
import Team from './pages/Team';
import Events from './pages/Events';
import Docs from './pages/Docs';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scenes" element={<Scenes />} />
            <Route path="/shaders" element={<Shaders />} />
            <Route path="/snippets" element={<Snippets />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App
