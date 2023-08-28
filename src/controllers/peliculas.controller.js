import asyncHandler from "express-async-handler";
import Movie from "../models/movies.model.js";
import { json } from "express";

//obtener movies por iduser
export const getMoviesUser = asyncHandler(async (req, res) => {
  const id = req.user._id

    try {
      const movies = await Movie.find({user: id});
      if(movies.length === 0 ) res.json("Not Movies for User")
      res.json(movies)
      
    } catch (error) {
      console.log("error no user id")
      res.json({menssage: "Error not font iduser"})
    }
  
});

//obtener movie  todas las peliculas

export const getMovies = asyncHandler( async (req, res) => {
  
  const movies = await Movie.find()
  console.log("movies result")
  res.json(movies)

})

export const getMoviesLike = asyncHandler( async(req, res) => {
  const iduser = req.user._id

  const movieLike = await Movie.find({user: iduser,like: true})
  
  res.json(movieLike)
})

//create Movie
export const createMovie = asyncHandler(async (req, res) => {
  const id = req.user._id
  
  const { title, original_language, overview, } = req.body;

  try {
    if(!title || !overview)(res.status(400).json("data not complet"))

  const buscarDupl = await Movie.findOne({ title: title });
  console.log(buscarDupl);
  if (buscarDupl != null) {
    res.status(400).json("titulo registrado, intente otro titulo");
  }

  const newMovie = {
    title: title,
    original_language: original_language ? original_language: "es",
    overview: overview,
    like: req.body.like ?  req.body.like : false,
    user: id
  };

  const saveMovie = await Movie(newMovie).save();
  res.status(201).json(saveMovie);

  } catch (error) {
    res.status(400).json("Error, action no aplied")
  }
  
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
  const iduser = req.user._id
  const { id } = req.params;
  try {
    //encuentra la pelicula con id
    const foundMovie = await Movie.findById(id)
    if (!foundMovie){
      res.status(404).json("no found Id movie")
    }
    //compara si user de la respuesta es igual al user del user logueado
    if(foundMovie.user.toString() === iduser.toString()){
      console.log("soy if")
      const result = await Movie.findOneAndRemove({_id: id, user: iduser})
      res.json(result._id)
      
    }else{
      res.json("not access for Id")
    }
    
  } catch (error) {
    res.status(404).json("Error, action not applied")
  }
});

export const DeleteMovieId = asyncHandler( async (req,res) => {
 const  iduser = req.user._id
 const {id} = req.params

 const result = await Movie.findById(id)

 if(!result){ res.json("no se encontro el id de la pelicula")}
 const dbRemov = await Movie.findByIdAndDelete(id)
  res.json("succesfull "+dbRemov._id)

})
