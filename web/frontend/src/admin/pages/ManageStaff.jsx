import React, { useEffect, useState } from "react";
import { fetchStaff, addStaff, updateStaff, deleteStaff, uploadStaffImage } from "../utils/api";

const ManageStaff = () => {
	const [staff, setStaff] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({ fullName: "", role: "", education: "", email: "", bio: "", image: "" });
	const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

	const load = async () => {
		try {
			const data = await fetchStaff();
			setStaff(data);
		} catch (e) {
			setMessage({ type: "error", text: e?.message || "Failed to load staff." });
			setTimeout(() => setMessage({ type: "", text: "" }), 5000);
		}
	};

	useEffect(() => { load(); }, []);

	const openModal = (item = null) => {
		setEditing(item);
		setForm(item || { fullName: "", role: "", education: "", email: "", bio: "", image: "" });
		setShowModal(true);
	};

	const handleImageSelect = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			const { url } = await uploadStaffImage(file);
			setForm((prev) => ({ ...prev, image: url }));
			setMessage({ type: "success", text: "Image uploaded successfully." });
			setTimeout(() => setMessage({ type: "", text: "" }), 3000);
		} catch (err) {
			setMessage({ type: "error", text: err?.message || "Failed to upload image. Please try again." });
			setTimeout(() => setMessage({ type: "", text: "" }), 5000);
		} finally {
			setUploading(false);
		}
	};

	const save = async () => {
		try {
			if (editing) {
				await updateStaff(editing._id, form);
				setMessage({ type: "success", text: "Staff updated successfully!" });
			} else {
				await addStaff(form);
				setMessage({ type: "success", text: "Staff added successfully!" });
			}
			setShowModal(false);
			setEditing(null);
			await load();
			setTimeout(() => setMessage({ type: "", text: "" }), 3000);
		} catch (e) {
			setMessage({ type: "error", text: e?.message || "Failed to save staff. Please try again." });
			setTimeout(() => setMessage({ type: "", text: "" }), 5000);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this staff member?")) return;
		try {
			await deleteStaff(id);
			setMessage({ type: "success", text: "Staff deleted successfully!" });
			await load();
			setTimeout(() => setMessage({ type: "", text: "" }), 3000);
		} catch (e) {
			setMessage({ type: "error", text: e?.message || "Failed to delete staff. Please try again." });
			setTimeout(() => setMessage({ type: "", text: "" }), 5000);
		}
	};

	return (
		<div className="w-full font-[Poppins] p-6 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold text-[#2E5979] mb-6">Manage Staff</h1>

			{/* Message Display */}
			{message.text && (
				<div className={`mb-4 p-4 rounded-md ${
					message.type === "success"
						? "bg-green-100 text-green-800 border border-green-200"
						: "bg-red-100 text-red-800 border border-red-200"
				}`}>
					{message.text}
				</div>
			)}

			<div className="flex justify-between mb-4">
				<h2 className="text-xl font-bold text-gray-700">Team Members</h2>
				<button onClick={() => openModal()} className="bg-[#E69D4A] text-black px-4 py-2 rounded-md font-semibold hover:bg-opacity-90 transition duration-200">+ Add Staff</button>
			</div>

			<div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm">
				<table className="w-full table-auto text-left">
					<thead className="bg-[#2E5979]/20">
						<tr>
							<th className="px-6 py-3 text-sm font-semibold text-gray-900">Full Name</th>
							<th className="px-6 py-3 text-sm font-semibold text-gray-900">Role</th>
							<th className="px-6 py-3 text-sm font-semibold text-gray-900">Email</th>
							<th className="px-6 py-3 text-sm font-semibold text-gray-900">Image</th>
							<th className="px-6 py-3 text-sm font-semibold text-gray-900">Actions</th>
						</tr>
					</thead>
					<tbody>
						{staff.map((m) => (
							<tr key={m._id} className="border-b">
								<td className="px-6 py-3">{m.fullName}</td>
								<td className="px-6 py-3">{m.role}</td>
								<td className="px-6 py-3">{m.email}</td>
								<td className="px-6 py-3">{m.image && <img src={m.image} alt={m.fullName} className="w-16 h-16 object-cover rounded-full" />}</td>
								<td className="px-6 py-3 flex gap-2">
									<button className="text-[#2E5979] font-semibold hover:underline" onClick={() => openModal(m)}>Edit</button>
									<button className="text-red-500 font-semibold hover:underline" onClick={() => handleDelete(m._id)}>Delete</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
						<h2 className="text-xl font-bold mb-4">{editing ? "Edit Staff" : "Add Staff"}</h2>
						<input className="w-full mb-3 p-2 border rounded" placeholder="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
						<input className="w-full mb-3 p-2 border rounded" placeholder="Role / Position" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
						<input className="w-full mb-3 p-2 border rounded" placeholder="Education" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
						<input className="w-full mb-3 p-2 border rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
						<div className="w-full mb-3">
							<label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
							<input type="file" accept="image/*" onChange={handleImageSelect} />
							{uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
							{form.image && !uploading && (
								<div className="mt-2 flex items-center gap-3">
									<img src={form.image} alt="Preview" className="w-24 h-24 object-cover rounded-full border" />
									<button type="button" onClick={() => setForm((prev) => ({ ...prev, image: "" }))} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Remove image</button>
								</div>
							)}
						</div>
						<textarea className="w-full mb-3 p-2 border rounded" placeholder="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
						<div className="flex justify-end gap-3">
							<button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">Cancel</button>
							<button onClick={save} className="px-4 py-2 rounded bg-[#2E5979] text-white" disabled={uploading}>Save</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ManageStaff;


