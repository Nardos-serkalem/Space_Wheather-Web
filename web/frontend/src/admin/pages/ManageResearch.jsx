import React, { useEffect, useState } from "react";
import { 
  fetchProjects, 
  addProject, 
  updateProject, 
  deleteProject,
  fetchPublications,
  addPublication,
  updatePublication,
  deletePublication
} from "../utils/api";


const ManageResearch = () => {
  const [activeTab, setActiveTab] = useState("Projects");

  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
  });

  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [editingPublication, setEditingPublication] = useState(null);
  const [publicationForm, setPublicationForm] = useState({
    title: "",
    authors: "",
    date: "",
    description: "",
    link: "",
  });

  // Publication date controls (Admin wants Month+Year or Year only)
  const [pubDateMode, setPubDateMode] = useState("month"); // 'month' | 'year'
  const [pubYearOnly, setPubYearOnly] = useState("");

  const formatDateForDisplay = (dateValue) => {
    if (!dateValue) return "";
    const str = String(dateValue);
    if (/^\d{4}$/.test(str)) return str; // YYYY
    const ym = str.match(/^(\d{4})-(\d{2})$/); // YYYY-MM
    if (ym) {
      const [_, year, mm] = ym;
      const monthIndex = parseInt(mm, 10) - 1;
      const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${months[monthIndex] || mm} ${year}`;
    }
    const iso = str.match(/^(\d{4})-(\d{2})-\d{2}/); // strip day/time if present
    if (iso) {
      const [_, year, mm] = iso;
      const monthIndex = parseInt(mm, 10) - 1;
      const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      return `${months[monthIndex] || mm} ${year}`;
    }
    return str;
  };

  // --- Fetch data from API ---
  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPublications = async () => {
    try {
      const data = await fetchPublications();
      setPublications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
    loadPublications();
  }, []);

  // --- Projects Handlers ---
  const openProjectModal = (project = null) => {
    setEditingProject(project);
    setProjectForm(project || { title: "", category: "", description: "", image: "" });
    setShowProjectModal(true);
  };

  const saveProject = async () => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, projectForm);
      } else {
        await addProject(projectForm);
      }
      setShowProjectModal(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Publications Handlers ---
  const openPublicationModal = (pub = null) => {
    setEditingPublication(pub);
    // Initialize form
    setPublicationForm(pub || { title: "", authors: "", date: "", description: "", link: "" });
    // Initialize date mode
    const incoming = pub?.date ? String(pub.date) : "";
    if (/^\d{4}$/.test(incoming)) {
      setPubDateMode("year");
      setPubYearOnly(incoming);
    } else if (/^(\d{4})-(\d{2})$/.test(incoming)) {
      setPubDateMode("month");
      setPubYearOnly("");
    } else if (/^(\d{4})-(\d{2})-\d{2}/.test(incoming)) {
      setPubDateMode("month");
      setPubYearOnly("");
      // Normalize to YYYY-MM in the form
      const ym = incoming.slice(0, 7);
      setPublicationForm((prev) => ({ ...prev, date: ym }));
    } else {
      setPubDateMode("month");
      setPubYearOnly("");
    }
    setShowPublicationModal(true);
  };

  const savePublication = async () => {
    try {
      // Prepare payload with normalized date value
      let payload = { ...publicationForm };
      if (pubDateMode === "year") {
        payload.date = pubYearOnly.trim(); // "YYYY"
      } // else expect publicationForm.date as "YYYY-MM"

      if (editingPublication) {
        await updatePublication(editingPublication._id, payload);
      } else {
        await addPublication(payload);
      }
      setShowPublicationModal(false);
      setEditingPublication(null);
      await loadPublications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      await deletePublication(id);
      await loadPublications();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full font-[Poppins] p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#2E5979] mb-6">Manage Research</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["Projects", "Publications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-md font-semibold transition duration-300 border-2 ${
              activeTab === tab
                ? "bg-[#2E5979] border-[#2E5979] text-white shadow-md"
                : "bg-transparent border-gray-400 text-[#2E5979] hover:bg-[#2E5979] hover:text-white hover:border-[#2E5979]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Table */}
      {activeTab === "Projects" && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Projects</h2>
            <button
              onClick={() => openProjectModal()}
              className="bg-[#E69D4A] text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-200"
            >
              + Add Project
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
            <table className="w-full table-auto text-left">
              <thead className="bg-[#2E5979]/20">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Image</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="px-6 py-3">{p.title}</td>
                    <td className="px-6 py-3">{p.category}</td>
                    <td className="px-6 py-3">
                      {p.image && <img src={p.image} alt={p.title} className="w-20 h-12 object-cover rounded" />}
                    </td>
                    <td className="px-6 py-3">{p.description}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-[#2E5979] font-semibold hover:underline" onClick={() => openProjectModal(p)}>Edit</button>
                      <button className="text-red-500 font-semibold hover:underline" onClick={() => handleDeleteProject(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Publications Table */}
      {activeTab === "Publications" && (
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Publications</h2>
            <button
              onClick={() => openPublicationModal()}
              className="bg-[#E69D4A] text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-200"
            >
              + Add Publication
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
            <table className="w-full table-auto text-left">
              <thead className="bg-[#2E5979]/20">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Authors</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((pub) => (
                  <tr key={pub._id} className="border-b">
                    <td className="px-6 py-3">{pub.title}</td>
                    <td className="px-6 py-3">{pub.authors}</td>
                    <td className="px-6 py-3">{formatDateForDisplay(pub.date)}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button className="text-[#2E5979] font-semibold hover:underline" onClick={() => openPublicationModal(pub)}>Edit</button>
                      <button className="text-red-500 font-semibold hover:underline" onClick={() => handleDeletePublication(pub._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingProject ? "Edit Project" : "Add Project"}</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Title"
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Category"
              value={projectForm.category}
              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Image URL"
              value={projectForm.image}
              onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
            />
            <textarea
              className="w-full mb-3 p-2 border rounded"
              placeholder="Description"
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowProjectModal(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={saveProject} className="px-4 py-2 rounded bg-[#2E5979] text-white">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Publication Modal */}
      {showPublicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingPublication ? "Edit Publication" : "Add Publication"}</h2>
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Title"
              value={publicationForm.title}
              onChange={(e) => setPublicationForm({ ...publicationForm, title: e.target.value })}
            />
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Authors"
              value={publicationForm.authors}
              onChange={(e) => setPublicationForm({ ...publicationForm, authors: e.target.value })}
            />
            {/* Date Mode Toggle */}
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pubDateMode"
                  checked={pubDateMode === "month"}
                  onChange={() => setPubDateMode("month")}
                />
                <span>Month + Year</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="pubDateMode"
                  checked={pubDateMode === "year"}
                  onChange={() => setPubDateMode("year")}
                />
                <span>Year only</span>
              </label>
            </div>
            {pubDateMode === "month" ? (
              <input
                type="month"
                className="w-full mb-3 p-2 border rounded"
                value={publicationForm.date}
                onChange={(e) => setPublicationForm({ ...publicationForm, date: e.target.value })}
              />
            ) : (
              <input
                type="number"
                className="w-full mb-3 p-2 border rounded"
                placeholder="YYYY"
                min="1900"
                max="2100"
                value={pubYearOnly}
                onChange={(e) => setPubYearOnly(e.target.value)}
              />
            )}
            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="DOI Link"
              value={publicationForm.link}
              onChange={(e) => setPublicationForm({ ...publicationForm, link: e.target.value })}
            />
            <textarea
              className="w-full mb-3 p-2 border rounded"
              placeholder="Description"
              value={publicationForm.description}
              onChange={(e) => setPublicationForm({ ...publicationForm, description: e.target.value })}
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowPublicationModal(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={savePublication} className="px-4 py-2 rounded bg-[#2E5979] text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageResearch;
