import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

mongoose.connect(uri!);

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const userModel =
  mongoose.models.truffleUsers || mongoose.model("truffleUsers", userSchema);

export const watchListSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  movieWatchList: {
    type: [],
  },
  tvWatchList: {
    type: [],
  },
});

export const watchListModel =
  mongoose.models.truffleWatchList ||
  mongoose.model("truffleWatchList", watchListSchema);
