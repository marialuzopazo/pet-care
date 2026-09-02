import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/storage';
import logo from '../assets/logopetcare2.png';
import '../styles/auth.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Registro() {
  const [form, setForm] = useState({
    nombreCompleto: '',
    correo: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { nombreCompleto, correo, usuario, contrasena, confirmarContrasena } = form;

    if (!nombreCompleto || !correo || !usuario || !contrasena || !confirmarContrasena) {
      setError('Por favor, completá todos los campos.');
      return;
    }
    if (!EMAIL_REGEX.test(correo)) {
      setError('Ingresá un correo electrónico válido.');
      return;
    }
    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      registerUser({ nombreCompleto, correo, usuario, contrasena });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="logo">
          <img src={logo} alt="Logo PetCare" />
        </div>
        <h1 className="app-title">Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            className="input-field"
            value={form.nombreCompleto}
            onChange={handleChange('nombreCompleto')}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input-field"
            value={form.correo}
            onChange={handleChange('correo')}
          />
          <input
            type="text"
            placeholder="Nombre de usuario"
            className="input-field"
            value={form.usuario}
            onChange={handleChange('usuario')}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
            value={form.contrasena}
            onChange={handleChange('contrasena')}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="input-field"
            value={form.confirmarContrasena}
            onChange={handleChange('confirmarContrasena')}
          />
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">¡Registro exitoso! Redirigiendo...</p>}
          <button type="submit" className="register-button">
            REGISTRARSE
          </button>
        </form>
        <Link to="/" className="auth-link">
          ¿Ya tenés cuenta? Iniciá sesión
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
