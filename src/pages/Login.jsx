import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../utils/storage';
import logo from '../assets/logopetcare2.png';
import '../styles/auth.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!usuario.trim() || !contrasena) {
      setError('Por favor, completá ambos campos.');
      return;
    }

    const user = login(usuario.trim(), contrasena);
    if (!user) {
      setError('Usuario o contraseña incorrectos.');
      return;
    }

    navigate('/panel');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="logo">
          <img src={logo} alt="Logo PetCare" />
        </div>
        <h1 className="app-title">Pet Care</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="USUARIO"
            className="input-field"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="CONTRASEÑA"
            className="input-field"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">
            INICIAR SESION
          </button>
        </form>
        <Link to="/registro" className="auth-link">
          ¿No tenés cuenta? Registrate
        </Link>
      </div>
      <ul className="background-circles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
}
