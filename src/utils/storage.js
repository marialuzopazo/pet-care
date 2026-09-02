const USERS_KEY = 'petcare_users';
const SESSION_KEY = 'petcare_session';

const petsKey = (usuario) => `petcare_pet_${usuario}`;
const tasksKey = (usuario) => `petcare_tasks_${usuario}`;

function readJSON(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getUsers() {
  return readJSON(USERS_KEY, []);
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ nombreCompleto, correo, usuario, contrasena }) {
  const users = getUsers();
  if (users.some((u) => u.usuario.toLowerCase() === usuario.toLowerCase())) {
    throw new Error('Ese nombre de usuario ya está en uso.');
  }
  if (users.some((u) => u.correo.toLowerCase() === correo.toLowerCase())) {
    throw new Error('Ese correo ya está registrado.');
  }
  users.push({ nombreCompleto, correo, usuario, contrasena });
  saveUsers(users);
}

export function login(usuario, contrasena) {
  const user = getUsers().find(
    (u) => u.usuario.toLowerCase() === usuario.toLowerCase() && u.contrasena === contrasena
  );
  if (!user) return null;
  localStorage.setItem(SESSION_KEY, user.usuario);
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser() {
  const usuario = getSession();
  if (!usuario) return null;
  return getUsers().find((u) => u.usuario === usuario) || null;
}

export function getTasks(usuario) {
  return readJSON(tasksKey(usuario), []);
}

export function saveTasks(usuario, tasks) {
  localStorage.setItem(tasksKey(usuario), JSON.stringify(tasks));
}

function defaultPet() {
  return {
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    sexo: '',
    vacunas: [],
    atenciones: [],
    turnos: [],
  };
}

export function getPet(usuario) {
  return readJSON(petsKey(usuario), defaultPet());
}

export function savePet(usuario, pet) {
  localStorage.setItem(petsKey(usuario), JSON.stringify(pet));
}
