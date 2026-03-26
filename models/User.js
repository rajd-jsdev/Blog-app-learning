import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: String,
  age: {
    type: Number,
    required: true,
    min: 1,
  },
});

userSchema.pre("save", function (next) {
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
