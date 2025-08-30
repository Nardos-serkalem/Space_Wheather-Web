import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	role: { type: String, required: true },
	education: { type: String, default: "" },
	email: { type: String, default: "" },
	bio: { type: String, default: "" },
	image: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Staff", staffSchema);


