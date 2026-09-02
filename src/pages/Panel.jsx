import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getTasks, saveTasks, logout } from '../utils/storage';
import logo from '../assets/logopetcare2.png';
import '../styles/panel.css';

const TIPO_LABEL = {
  turno: 'Turno',
  vacuna: 'Vacunación',
  peluqueria: 'Peluquería',
};

export default function Panel() {
  const navigate = useNavigate();
  const [usuario] = useState(getCurrentUser());
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', fecha: '', tipo: '' });

  useEffect(() => {
    if (usuario) setTareas(getTasks(usuario.usuario));
  }, [usuario]);

  const persist = (next) => {
    setTareas(next);
    saveTasks(usuario.usuario, next);
  };

  const handleAgregarTarea = (e) => {
    e.preventDefault();
    const { titulo, fecha, tipo } = nuevaTarea;
    if (!titulo.trim() || !fecha || !tipo) {
      alert('Completa todos los campos');
      return;
    }
    persist([...tareas, { titulo: titulo.trim(), fecha, tipo, hecha: false }]);
    setNuevaTarea({ titulo: '', fecha: '', tipo: '' });
  };

  const toggleHecha = (index) => {
    const next = tareas.map((t, i) => (i === index ? { ...t, hecha: !t.hecha } : t));
    persist(next);
  };

  const borrarTarea = (index) => {
    if (!confirm('¿Eliminar esta tarea?')) return;
    persist(tareas.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!usuario) return null;

  return (
    <div className="panel-page">
      <div className="panel-container">
        <div className="logo">
          <img src={logo} alt="Logo PetCare" />
        </div>
        <h1 className="app-title">Panel de Usuario</h1>

        <div className="user-info">
          <p><strong>Nombre:</strong> {usuario.nombreCompleto}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Usuario:</strong> {usuario.usuario}</p>
        </div>

        <div className="panel-actions">
          <Link to="/ficha" className="ficha-button">Ver ficha de mi mascota</Link>
          <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div>

        <form className="form-tarea" onSubmit={handleAgregarTarea}>
          <input
            type="text"
            placeholder="Ej: Turno con el veterinario"
            value={nuevaTarea.titulo}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
          />
          <input
            type="date"
            value={nuevaTarea.fecha}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha: e.target.value })}
          />
          <select
            value={nuevaTarea.tipo}
            onChange={(e) => setNuevaTarea({ ...nuevaTarea, tipo: e.target.value })}
          >
            <option value="">Seleccionar tipo</option>
            <option value="turno">Turno</option>
            <option value="vacuna">Vacunación</option>
            <option value="peluqueria">Peluquería</option>
          </select>
          <button type="submit">Agregar tarea</button>
        </form>

        <div className="tareas-section">
          {Object.entries(TIPO_LABEL).map(([tipo, label]) => (
            <div key={tipo}>
              <h2>{label}</h2>
              <ul className="lista-tareas">
                {tareas.filter((t) => t.tipo === tipo).length === 0 && (
                  <li className="tarea-vacia">Sin tareas</li>
                )}
                {tareas.map((tarea, i) =>
                  tarea.tipo === tipo ? (
                    <li key={i} className={tarea.hecha ? 'hecha' : ''}>
                      <span>{tarea.titulo} - {tarea.fecha}</span>
                      <span className="botones-tarea">
                        <button onClick={() => toggleHecha(i)} title="Marcar como hecha">✓</button>
                        <button onClick={() => borrarTarea(i)} title="Eliminar">🗑</button>
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <ul className="background-circles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
}
