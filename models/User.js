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
});

userSchema.pre("save", (user) => {});
const User = mongoose.model("User", userSchema);
export default User;
