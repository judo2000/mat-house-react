const mongooseSlugPlugin = require('mongoose-slug-plugin');
const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  eventStyle: {
    type: String,
    required: true,
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
  eventCity: String,
  eventState: String,
  eventGenInfo: String,
  eventWeighInInfo: String,
  eventStartDate: {
    type: Date,
  },
  eventEndDate: {
    type: Date,
  },
  earlyEntryDeadline: {
    type: Date,
  },
  eventStartTime: String,
  entryDeadline: {
    type: Date,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Club',
  },
  createdAt: {
    type: Date,
    immutable: true,
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
