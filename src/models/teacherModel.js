import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: true,
    unique: true,
    // match: /^[0-9]{10}$/,
  },
  startDate: {
    type: Date,
    // required: true,
  },
  endDate: {
    type: Date
  },
  teacherPositionsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacherpositions',
    },
  ],
  degrees: [
    {
      type: {
        type: String,
        required: true,
        enum: ['Cử nhân', 'Thạc sĩ', 'Tiến sĩ', 'Giáo sư'],
      },
      school: {
        type: String,
        required: true,
        trim: true,
      },
      major: {
        type: String,
        required: true,
        trim: true,
      },
      year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
      isGraduated: {
        type: Boolean,
        default: true,
      },
    },
  ]
}, {
  timestamps: true
})

const teacherModel = mongoose.model('teachers', teacherSchema);

export default teacherModel;