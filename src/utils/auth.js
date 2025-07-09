const BASE_URL = "http://localhost:3001";

// 🔥 REGISTER: Créer un nouvel utilisateur
export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
};

// 🔥 LOGIN: Authentifier un utilisateur existant
export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// 🔥 CHECK TOKEN: Vérifier le token JWT et récupérer les infos utilisateur
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

// ✅ Fonction utilitaire pour gérer les réponses
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    const error = new Error("Erreur API");
    error.data = err;
    throw error;
  });
};
