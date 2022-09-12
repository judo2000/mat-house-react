const mongooseSlugPlugin = require('mongoose-slug-plugin');
const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  style: {
    type: String,
    require: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  shortDesc: {
    type: String,
  },
  longDesc: {
    type: String,
  },
  waiver: {
    type: String,
  },
  customBasicFields: [
    {
      type: String,
    },
  ],
  earlyFirstEntry: {
    type: Number,
    default: 0,
  },
  lateFirstEntry: {
    type: Number,
    default: 0,
  },
  earlyAddEntry: {
    type: Number,
    default: 0,
  },
  lateAddEntry: {
    type: Number,
    defualt: 0,
  },
  earlyEntryDeadline: {
    type: Date,
    default: 0,
  },
  entryDeadline: {
    type: Date,
    default: 0,
  },
  eventStartDate: {
    type: Date,
    default: 0,
  },
  eventEndDate: {
    type: Date,
    default: 0,
  },
  weighInStartTime: {
    type: String,
    default: '',
  },
  weighInEndTime: {
    type: String,
    default: '',
  },
  customLogisticsFields: [
    {
      type: String,
    },
  ],
  createdBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Club',
    },
  ],
  createdAt: {
    type: Date,
    imutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

eventSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=eventName%>' });

const Event = model('Event', eventSchema);
module.exports = Event;
