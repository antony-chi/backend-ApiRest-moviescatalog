import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const URIAPI = process.env.URI_APIMOVIES;

const dataJson = {}

const longMovies = async () => {
  const res = await fetch(URIAPI);
  const dataJson = await res.json()
  const arrayObj = Object.values(dataJson)

  const map1 = arrayObj.map((i) => [i].results)
  console.log(map1)
    

};

longMovies()

