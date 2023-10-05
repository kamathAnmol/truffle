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
const dateSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  seats_booked: {
    type: Number,
  },
});

const timingSchema = new mongoose.Schema({
  time: {
    type: String,
  },
  date: [dateSchema],
});

const movieSchema = new mongoose.Schema({
  movie: {
    type: Number,
  },
  time: [timingSchema],
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
  movies: [movieSchema],
  total_seats: {
    type: Number,
    required: true,
  },
});

export const theatreModel =
  mongoose.models.truffletheatres ||
  mongoose.model("truffletheatres", theatreSchema);

const timeSchema = new mongoose.Schema({
  show_time: {
    type: String,
    required: true,
  },
  show_date: {
    type: String,
    required: true,
  },
});
const bookingSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  movie_id: {
    type: Number,
    required: true,
  },
  theatre_id: {
    type: String,
    required: true,
  },
  time: timeSchema,
  seats: {
    type: Number,
  },
});

export const bookingModel =
  mongoose.models.trufflebookings ||
  mongoose.model("trufflebookings", bookingSchema);
