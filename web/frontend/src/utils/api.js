const BASE_URL = "http://localhost:5000/api"; // adjust if backend port changes

// --- Projects / Research ---
export const fetchProjects = async () => {
  const res = await fetch(`${BASE_URL}/research/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const fetchProjectById = async (id) => {
  const res = await fetch(`${BASE_URL}/research/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
};

export const addProject = async (data) => {
  const res = await fetch(`${BASE_URL}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "project" }),
  });
  if (!res.ok) throw new Error("Failed to add project");
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${BASE_URL}/research/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "project" }),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${BASE_URL}/research/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};

// --- Publications ---
export const fetchPublications = async () => {
  const res = await fetch(`${BASE_URL}/research/publications`);
  if (!res.ok) throw new Error("Failed to fetch publications");
  return res.json();
};

export const fetchPublicationById = async (id) => {
  const res = await fetch(`${BASE_URL}/research/${id}`);
  if (!res.ok) throw new Error("Failed to fetch publication");
  return res.json();
};

export const addPublication = async (data) => {
  const res = await fetch(`${BASE_URL}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "publication" }),
  });
  if (!res.ok) throw new Error("Failed to add publication");
  return res.json();
};

export const updatePublication = async (id, data) => {
  const res = await fetch(`${BASE_URL}/research/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "publication" }),
  });
  if (!res.ok) throw new Error("Failed to update publication");
  return res.json();
};

export const deletePublication = async (id) => {
  const res = await fetch(`${BASE_URL}/research/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete publication");
  return res.json();
};
