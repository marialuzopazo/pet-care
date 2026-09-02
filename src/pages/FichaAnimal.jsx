import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getPet, savePet } from '../utils/storage';
import petPhoto from '../assets/pet-default.jpeg';
import '../styles/ficha.css';

const SECCIONES = [
  { key: 'vacunas', titulo: 'VACUNAS', singular: 'vacuna', className: 'section' },
  { key: 'atenciones', titulo: 'ATENCIONES', singular: 'atención', className: 'section' },
  { key: 'turnos', titulo: 'TURNOS', singular: 'turno', className: 'section2' },
];

export default function FichaAnimal() {
  const usuario = getCurrentUser();
  const [animal, setAnimal] = useState(() => getPet(usuario.usuario));
  const [editandoDatos, setEditandoDatos] = useState(false);
  const [datosForm, setDatosForm] = useState(animal);

  const [modalTipo, setModalTipo] = useState(null);
  const [nuevaEntrada, setNuevaEntrada] = useState({ fecha: '', descripcion: '' });

  useEffect(() => {
    savePet(usuario.usuario, animal);
  }, [animal, usuario.usuario]);

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setNuevaEntrada({ fecha: '', descripcion: '' });
  };

  const cerrarModal = () => setModalTipo(null);

  const guardarEntrada = () => {
    if (!nuevaEntrada.fecha || !nuevaEntrada.descripcion.trim()) {
      alert('Por favor, complete ambos campos.');
      return;
    }
    setAnimal((prev) => ({
      ...prev,
      [modalTipo]: [...prev[modalTipo], { ...nuevaEntrada, descripcion: nuevaEntrada.descripcion.trim() }],
    }));
    cerrarModal();
  };

  const guardarDatos = (e) => {
    e.preventDefault();
    setAnimal((prev) => ({ ...prev, ...datosForm }));
    setEditandoDatos(false);
  };

  return (
    <div className="ficha-page">
      <div className="panel-container">
        <div className="ficha-topbar">
          <Link to="/panel" className="back-link">← Volver al panel</Link>
        </div>

        <div className="pet-header">
          <img src={petPhoto} alt="Foto de mascota" className="pet-photo" />
          <div className="pet-info">
            <div className="pet-name">NOMBRE <strong>{animal.nombre || 'Sin definir'}</strong></div>
            <div className="pet-details">
              <span>ESPECIE <strong>{animal.especie || '-'}</strong></span>
              <span>RAZA <strong>{animal.raza || '-'}</strong></span>
              <span>EDAD <strong>{animal.edad || '-'}</strong></span>
              <span>SEXO <strong>{animal.sexo || '-'}</strong></span>
            </div>

            {!editandoDatos && (
              <button className="edit-pet-button" onClick={() => { setDatosForm(animal); setEditandoDatos(true); }}>
                Editar datos
              </button>
            )}

            {editandoDatos && (
              <form className="pet-edit-form" onSubmit={guardarDatos}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={datosForm.nombre}
                  onChange={(e) => setDatosForm({ ...datosForm, nombre: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Especie"
                  value={datosForm.especie}
                  onChange={(e) => setDatosForm({ ...datosForm, especie: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Raza"
                  value={datosForm.raza}
                  onChange={(e) => setDatosForm({ ...datosForm, raza: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Edad"
                  value={datosForm.edad}
                  onChange={(e) => setDatosForm({ ...datosForm, edad: e.target.value })}
                />
                <select
                  value={datosForm.sexo}
                  onChange={(e) => setDatosForm({ ...datosForm, sexo: e.target.value })}
                >
                  <option value="">Sexo</option>
                  <option value="M">Macho</option>
                  <option value="H">Hembra</option>
                </select>
                <div className="form-actions">
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditandoDatos(false)}>Cancelar</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {SECCIONES.map(({ key, titulo, singular, className }) => (
          <div className={className} key={key}>
            <h3>{titulo} ({animal[key].length})</h3>
            <ul className="list">
              {animal[key].length === 0 && <li>Sin registros</li>}
              {animal[key].map((entrada, i) => (
                <li key={i}>
                  <span>{entrada.fecha}</span> {entrada.descripcion}
                </li>
              ))}
            </ul>
            <button onClick={() => abrirModal(key)}>+ Añadir {singular}</button>
          </div>
        ))}

        {modalTipo && (
          <div className="modal">
            <div className="modal-content">
              <h3>Agregar entrada a {modalTipo}</h3>
              <input
                type="date"
                value={nuevaEntrada.fecha}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, fecha: e.target.value })}
              />
              <input
                type="text"
                placeholder="Descripción"
                value={nuevaEntrada.descripcion}
                onChange={(e) => setNuevaEntrada({ ...nuevaEntrada, descripcion: e.target.value })}
              />
              <div className="modal-actions">
                <button onClick={guardarEntrada}>Guardar</button>
                <button onClick={cerrarModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
