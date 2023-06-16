import Movie from "../models/movies.model.js"

//obtener movies
export const getMovies = (req, res) => {
    
    res.send("obteniendo movies")
}

//create Movie
export const createMovie = (req, res) => {
    
    res.send("create movie")
}

//update movie
export const updateMovie = (req, res) => {
    res.send("actualizando movie")
}