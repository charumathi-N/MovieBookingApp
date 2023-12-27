import { response } from "express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import user from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async (req, res, next) => {
  console.log("I'm in booking controller");
  const { movie, date, seatNumber, user } = req.body;
  let exsistingMovie;
  let exsistingUser;
  try {
    exsistingMovie = await Movie.findById(movie);
    exsistingUser = await user.findById(user);
  } catch (Err) {
    return console.log(Err);
  }
  if (!exsistingMovie) {
    response.status(404).json({ message: "Movie not found with given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: " User not found with given ID" });
  }
  let booking;
  try {
    booking = new Booking({
      movie,
      date: new Date(date),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    exsistingUser.bookings.push(booking);
    exsistingMovie.bookings.push(booking);
    await exsistingUser.save({ session });
    await exsistingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndDelete(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.booking.pull(booking);
    await booking.movie.save({ session });
    await booking.movie.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
