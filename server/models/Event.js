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
  eventCity: {
    type: String,
    required: true,
  },
  eventState: {
    type: String,
    required: true,
  },
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
  entryDeadline: {
    type: Date,
  },
  earlyFirstEntryFee: Number,
  earlyAddEntryFee: Number,
  lateFirstEntryFee: Number,
  lateAddEntryFee: Number,
  eventStartTime: String,
  eventWaiver: String,
  judoDivJNov: Boolean,
  judoDivJAdv: Boolean,
  judoDivSNov: Boolean,
  judoDivSAdv: Boolean,
  judoDivSOpen: Boolean,
  judoDivMNov: Boolean,
  judoDivMAdv: Boolean,
  judoDivVI: Boolean,
  judoDivKata: Boolean,
  logo: String,
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
