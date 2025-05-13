const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  weeklyProgress: [{
    weekNumber: Number,
    scheduleRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule'
    },
    completionRate: {
      type: Number,
      min: 0,
      max: 100
    },
    evaluation: {
      type: String,
      enum: ['excellent', 'good', 'average']
    }
  }],
  monthlyStats: {
    averageCompletion: {
      type: Number,
      default: 0
    },
    totalSessions: {
      type: Number,
      default: 0
    },
    missedSessions: {
      type: Number,
      default: 0
    },
    achievements: [{
      type: String,
      description: String,
      date: Date
    }]
  },
  teacherNotes: [{
    note: String,
    date: {
      type: Date,
      default: Date.now
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  motherFeedback: [{
    feedback: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Compound index for efficient querying
progressSchema.index({ student: 1, year: 1, month: 1 });

// Virtual for calculating overall progress
progressSchema.virtual('overallProgress').get(function() {
  if (!this.weeklyProgress.length) return 0;
  
  const total = this.weeklyProgress.reduce((sum, week) => sum + week.completionRate, 0);
  return total / this.weeklyProgress.length;
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
