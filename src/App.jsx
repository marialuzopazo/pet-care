import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Panel from './pages/Panel';
import FichaAnimal from './pages/FichaAnimal';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <Panel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ficha"
          element={
            <ProtectedRoute>
              <FichaAnimal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
