require("dotenv").config();


//-------------- variables


var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var liriOption = process.argv[2]; 
var UserInput = process.argv[3];
// -----------------axios

axios.get("https://rest.bandsintown.com/artists/" +UserInput + "/events?app_id=codingbootcamp")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
  //------------------Spotify





  //--------------------------



  // concert-this
  // spotify-this-song
  // movie-this
  // do-what-it-says