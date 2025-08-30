import React, { useEffect, useState } from "react";
import { fetchStaff, addStaff, updateStaff, deleteStaff, uploadStaffImage } from "../utils/api";

const ManageStaff = () => {
	const [staff, setStaff] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState({ fullName: "", role: "", education: "", email: "", bio: "", image: "" });
	const [uploading, setUploading] = useState(false);

	const load = async () => {
		try {
			const data = await fetchStaff();
			setStaff(data);
		} catch (e) {
			console.error(e);
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
		} catch (err) {
			console.error(err);
		} finally {
			setUploading(false);
		}
	};

	const save = async () => {
		try {
			if (editing) {
				await updateStaff(editing._id, form);
			} else {
				await addStaff(form);
			}
			setShowModal(false);
			setEditing(null);
			await load();
		} catch (e) {
			console.error(e);
		}
	};

	const handleDelete = async (id) => {
		try {
			await deleteStaff(id);
			await load();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="w-full font-[Poppins] p-6 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold text-[#2E5979] mb-6">Manage Staff</h1>

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


