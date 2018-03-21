const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema({
  rating: {type: Number, enum: ['1', '2', '3', '4', '5']}
});

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  image: {type: String },
  password: {type: String},
  comments: [commentSchema],
  previousUsers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});


userSchema
  .virtual('avgRating')
  .get(function getAvgRating(){
    if(this.comments.length === 0) return 'N/A';
    const ratings = this.comments.map(comment => comment.rating);
    return Math.round(((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 2) / 2);
  });

// passwordConfirmation virtual

userSchema.pre('validate', function checkPasswordMatch(next) {
  if(!this.password && !this.facebookId) {
    this.invalidate('password', 'password is required');
  }
  if(this.password && this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.virtual('bathrooms', {
  ref: 'Bathroom',
  localField: '_id',
  foreignField: 'user'
});

userSchema.virtual('requests', {
  ref: 'Bathroom',
  localField: '_id',
  foreignField: 'requests.user'
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordMatch(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'passwords do not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
