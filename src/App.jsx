import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Builds from './pages/Builds';
import Team from './pages/Team';
import Events from './pages/Events';
import Analytics from './pages/Analytics';
import SceneViewer from './pages/SceneViewer';
import ShaderLab from './pages/ShaderLab';
import Performance from './pages/Performance';
import Resources from './pages/Resources';
import CodeSnippets from './pages/CodeSnippets';
import Calendar from './pages/Calendar';
import Timeline from './pages/Timeline';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/scene-viewer" element={<SceneViewer />} />
            <Route path="/shader-lab" element={<ShaderLab />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/code-snippets" element={<CodeSnippets />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/timeline" element={<Timeline />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App
