const mongooseSlugPlugin = require('mongoose-slug-plugin');
const { Schema, model } = require('mongoose');

const validateEmail = (clubEmail) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(clubEmail);
};

const clubSchema = new Schema({
  clubName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    require: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: String,
  clubEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  website: String,
  homeInfo: String,
  classSchedule: String,
  about: String,
  headInstructor: String,
  logo: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  clubAdmins: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  clubMemberIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

clubSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=clubName%>' });

const Club = model('Club', clubSchema);
module.exports = Club;
