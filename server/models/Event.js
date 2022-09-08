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
  // customFields: [
  //   {
  //     type: String,
  //   },
  // ],
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
