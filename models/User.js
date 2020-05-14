const { Schema, model } = require('mongoose');
const { isEmail, isLength } = require('validator');
const { compare, genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [
      true,
      'Error: Email address is required'
    ],
    validate: [
      isEmail,
      'Error: Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [
      true,
      'Error: Password is required'
    ],
    validate: [
      (value) => isLength(value, { min: 6 }),
      'Error: Password must be at least 6 characters long'
    ]
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  try {
    const isMatch = await compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    return Promise.reject(e);
  }
}

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(user.password, salt);
      user.password = hashedPassword;
    } catch (e) {
      next(e);
    }
  }
  next();
});

module.exports = model('User', UserSchema);