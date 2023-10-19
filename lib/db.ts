import mongoose from "mongoose";
const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

export const mongos = mongoose.connect(uri!);

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

//theatre Schema

const seats = new mongoose.Schema({
  platinum: Number,
  gold: Number,
  silver: Number,
});

const theatreSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timings: [{ type: String }],
  seats: seats,
});

export const theatreModel =
  mongoose.models.truffletheatres ||
  mongoose.model("truffletheatres", theatreSchema);

//shows Schema
const seatsSchema = new mongoose.Schema({
  silver: [String],
  gold: [String],
  platinum: [String],
});
const showsSchema = new mongoose.Schema({
  theatre: String,
  movie: String,
  date: String,
  time: String,
  booked_seats: seatsSchema,
});

export const showsModal =
  mongoose.models.truffleShows || mongoose.model("truffleShows", showsSchema);

//booking schema

const bookingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  movie: {
    type: Number,
    required: true,
  },
  show: {
    type: String,
    required: true,
  },
  time: String,
  date: String,
  seats: {
    type: seatsSchema,
  },
});

export const bookingModel =
  mongoose.models.trufflebookings ||
  mongoose.model("trufflebookings", bookingSchema);
