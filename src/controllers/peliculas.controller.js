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
      res.status(500).json("error could not apply the action")
    }
  
});

//obtener movie  todas las peliculas

export const getMovies = asyncHandler( async (req, res) => {

  try {
    //pulate() rellena el campo user que esta de ref en model user monstrando solo el campo user
  const movies = await Movie.find().populate("user", "name -_id")
  console.log("movies result")
  res.json(movies)
  } catch (error) {
    res.status(500).json("Error not get movie for Id")
  }
  

})
//get movies like true
export const getMoviesLike = asyncHandler( async(req, res) => {
  const iduser = req.user._id

  try {
    const movieLike = await Movie.find({user: iduser,like: true})
  res.json(movieLike)
  } catch (error) {
    res.status(500).json("Error not get movies like")
  }
  
})

//create Movie
export const createMovie = asyncHandler(async (req, res) => {
  const id = req.user._id
  
  const { title, original_language, overview, } = req.body;

  try {
    if(!title || !overview)(res.status(400).json("data not complet"))

    const buscarDupl = await Movie.findOne({ title: title });
    console.log(buscarDupl);
  if(buscarDupl != null) {
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
    res.status(500).json("Error, action no aplied")
  }
  
});

//update movie
export const updateMovie = asyncHandler(async (req, res) => {
  const idUser = req.user._id
  const { id } = req.params;
  if(!id) res.status(400).json("no Id movie provider")

  try {
    if(JSON.stringify(req.body) === "{}"){ res.status(400).json("no body request")}

    // const dupli = await Movie.findOne({ title : req.body.title})
    // console.log(dupli)
    // if(dupli) res.status(400).json("Existing Title, no saved")

    
    const updateMovie = await Movie.findById(id);
    if (!updateMovie) {
      res.status(404).json("no found id");
    }
    
    if(updateMovie.user.toString() === idUser.toString()){
      if(req.body.title){
        const titleDupli = await Movie.findOne({title: req.body.title})
        console.log(titleDupli)
        if(titleDupli) {res.status(400).json("Existing Title, no saved")}

      }
      const saved = await Movie.findByIdAndUpdate(id, req.body, { new: true });
      res.status(201).json(saved._id+" succesfull update")
      
    }else{
      res.status(401).json("no autorization")
    }
  } catch (error) {
    res.status(500).json("Error, no action applied")
  }

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
