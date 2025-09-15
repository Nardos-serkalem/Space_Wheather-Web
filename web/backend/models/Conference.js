import mongoose from "mongoose";

const conferenceSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    // optional
    required: false 
  },
  date: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  location: { 
    type: String, 
    // optional
    required: false 
  },
  type: { 
    type: String, 
    enum: ['upcoming', 'past'], 
    required: true 
  },
  image: { 
    type: String, 
    default: "" 
  },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed'], 
    default: 'upcoming' 
  },
  registrationLink: { 
    type: String, 
    default: "" 
  },
  website: { 
    type: String, 
    default: "" 
  },
  organizers: [{ 
    type: String 
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Index for efficient queries
conferenceSchema.index({ type: 1, date: -1 });
conferenceSchema.index({ status: 1, date: -1 });

export default mongoose.model("Conference", conferenceSchema);
