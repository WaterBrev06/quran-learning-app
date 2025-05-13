const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weekStartDate: {
    type: Date,
    required: true
  },
  verseNumber: {
    type: String,
    required: true
  },
  tasks: {
    listening: {
      requiredCount: {
        type: Number,
        default: 5
      },
      completed: {
        type: Number,
        default: 0
      }
    },
    teacherReading: {
      requiredCount: {
        type: Number,
        default: 5
      },
      completed: {
        type: Number,
        default: 0
      }
    },
    quranRecitation: {
      requiredCount: {
        type: Number,
        default: 5
      },
      completed: {
        type: Number,
        default: 0
      }
    },
    teacherRecitation: {
      requiredCount: {
        type: Number,
        default: 3
      },
      completed: {
        type: Number,
        default: 0
      }
    }
  },
  homeReview: [{
    day: {
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      required: true
    },
    completed: {
      type: Number,
      default: 0,
      max: 2 // 2 boxes per day
    }
  }],
  evaluation: {
    type: String,
    enum: ['excellent', 'good', 'average'],
    default: 'good'
  },
  teacherSignature: {
    type: Boolean,
    default: false
  },
  teacherNotes: String,
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  alerts: [{
    type: {
      type: String,
      enum: ['missing_mother_review', 'incomplete_tasks', 'missing_teacher_evaluation']
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    resolved: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Index for efficient querying
scheduleSchema.index({ student: 1, weekStartDate: 1 });
scheduleSchema.index({ teacher: 1, weekStartDate: 1 });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
