const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

//don't know why
//callback is added self
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,
    this.password,
    function (err, result) {
      if (err) console.log("Not Matched");
      else console.log(result);
    }
  );
};

//need to delve deep
userSchema.pre("save", async function (next) {
  if (!this.isModified) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("userModel", userSchema);
// const User = new mongoose.model("User", userSchema);

module.exports = User;
