import asyncHandler from "express-async-handler";
import Movie from "../models/movies.model.js";

//obtener movies
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

//create Movie
export const createMovie = asyncHandler(async (req, res) => {
  const { title, original_language, overview, } = req.body;

  if(!title || !original_language || !overview)(res.status(400).json("data not complet"))

  const buscarDupl = await Movie.findOne({ title: title });
  console.log(buscarDupl);
  if (buscarDupl != null) {
    res.status(400).json("titulo registrado, intente otro titulo");
  }

  const newMovie = {
    title: title,
    original_language: original_language,
    overview: overview,
    like: req.body.like ?  req.body.like : false
  };

  const saveMovie = await Movie(newMovie).save();
  res.status(201).json(saveMovie);
});

//update movie
export const updateMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const updateMovie = await Movie.findById(id);
  if (!updateMovie) {
    res.status(404).json("no se encontro el id");
  }
  const saved = await Movie.findByIdAndUpdate(id, req.body, { new: true });

  res.json(saved);
});

//delete movie by id
export const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const foundMovie = await Movie.findById(id);

  if(!foundMovie){
    res.json({menssage: "Erro not found Id " +id})
  }

  await Movie.findByIdAndDelete(id)

  res.json({ menssage: "deleted successfull "+id});
});
