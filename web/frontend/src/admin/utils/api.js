const API_BASE = "http://localhost:5000/api"; // adjust if backend port changes

// ----------------- Admin Authentication -----------------
export const adminLogin = async (username, password) => {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const getAdminProfile = async (token) => {
  const res = await fetch(`${API_BASE}/admin/profile`, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json" 
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

// ----------------- Research -----------------
export const fetchResearchList = async () => {
  const res = await fetch(`${API_BASE}/research`);
  if (!res.ok) throw new Error("Failed to fetch research list");
  return res.json();
};

export const fetchResearchById = async (id) => {
  const res = await fetch(`${API_BASE}/research/${id}`);
  if (!res.ok) throw new Error("Failed to fetch research");
  return res.json();
};

export const addResearch = async (data) => {
  const res = await fetch(`${API_BASE}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add research");
  return res.json();
};

export const updateResearch = async (id, data) => {
  const res = await fetch(`${API_BASE}/research/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update research");
  return res.json();
};

export const deleteResearch = async (id) => {
  const res = await fetch(`${API_BASE}/research/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete research");
  return res.json();
};

// ----------------- Publications -----------------
export const fetchPublications = async () => {
  const res = await fetch(`${API_BASE}/research/publications`);
  if (!res.ok) throw new Error("Failed to fetch publications");
  return res.json();
};

export const fetchPublicationById = async (id) => {
  const res = await fetch(`${API_BASE}/research/${id}`);
  if (!res.ok) throw new Error("Failed to fetch publication");
  return res.json();
};

export const addPublication = async (data) => {
  const res = await fetch(`${API_BASE}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "publication" }),
  });
  if (!res.ok) throw new Error("Failed to add publication");
  return res.json();
};

export const updatePublication = async (id, data) => {
  const res = await fetch(`${API_BASE}/research/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "publication" }),
  });
  if (!res.ok) throw new Error("Failed to update publication");
  return res.json();
};

export const deletePublication = async (id) => {
  const res = await fetch(`${API_BASE}/research/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete publication");
  return res.json();
};

// ----------------- Projects -----------------
export const fetchProjects = async () => {
  const res = await fetch(`${API_BASE}/research/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

export const addProject = async (data) => {
  const res = await fetch(`${API_BASE}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "project" }),
  });
  if (!res.ok) throw new Error("Failed to add project");
  return res.json();
};

export const updateProject = async (id, data) => {
  const res = await fetch(`${API_BASE}/research/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, type: "project" }),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_BASE}/research/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
};

// ----------------- Staff -----------------
export const fetchStaff = async () => {
  const res = await fetch(`${API_BASE}/staff`);
  if (!res.ok) throw new Error("Failed to fetch staff");
  return res.json();
};

export const addStaff = async (data) => {
  const res = await fetch(`${API_BASE}/staff`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add staff");
  return res.json();
};

export const updateStaff = async (id, data) => {
  const res = await fetch(`${API_BASE}/staff/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update staff");
  return res.json();
};

export const deleteStaff = async (id) => {
  const res = await fetch(`${API_BASE}/staff/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete staff");
  return res.json();
};

export const uploadStaffImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_BASE}/staff/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload image");
  return res.json(); // { url }
};

// ----------------- Events -----------------
export const fetchEventsList = async () => {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error("Failed to fetch events list");
  return res.json();
};

export const fetchEventById = async (id) => {
  const res = await fetch(`${API_BASE}/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export const addEvent = async (data) => {
  const res = await fetch(`${API_BASE}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add event");
  return res.json();
};

export const updateEvent = async (id, data) => {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update event");
  return res.json();
};

export const deleteEvent = async (id) => {
  const res = await fetch(`${API_BASE}/events/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete event");
  return res.json();
};