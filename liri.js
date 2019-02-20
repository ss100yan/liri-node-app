require("dotenv").config();


//-------------- variables


var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require('fs');
var liriOption = process.argv[2]; 
var UserInput = process.argv[3];




 
  


  //------------------Switch statemant
  function UserInputs (liriOption, UserInput){
  switch(liriOption) {
    case 'concert-this':
      bands(UserInput);
      break;
    case 'spotify-this-song':
      spfy(UserInput)
      break;
      case 'movie-this':
      omdb(UserInput);
      break;
      case 'do-what-it-says':
      fs();
      break;
    default:
    console.log("Invalid Option. Try: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
  }

  }

  // --------------------Axios

  //--------------------Bands in town
  function bands(UserInput){
    var queryUrl = "https://rest.bandsintown.com/artists/" + UserInput + "/events?app_id=codingbootcamp";
    axios.get(queryUrl)
      .then(function (response) {
        console.log(response);
        console.log(UserInput)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
                                           //     Name of the venue
                                           // Venue location
                                           // Date of the Event (use moment to format this as "MM/DD/YYYY")
    //--------------------OMBD
    function omdb(UserInput){
      var queryUrl = " http://www.omdbapi.com/?t=" + UserInput + " i=tt3896198&apikey=ed4f19eb";
      axios.get(queryUrl)
        .then(function (response) {
          console.log(response);
          console.log(UserInput)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
                                                            // * Title of the movie.
                                                            // * Year the movie came out.
                                                            // * IMDB Rating of the movie.
                                                               // * Rotten Tomatoes Rating of the movie.
                                                            // * Country where the movie was produced.
                                                                // * Language of the movie.
                                                            // * Plot of the movie.
                                                               // * Actors in the movie.
   
     
                                                              //  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


                                                              //  If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
                                                               
                                                              //  It's on Netflix!
     
                                                               //------------------Spotify
      function spfy(UserInput){
      spotify.search({ type: 'track', query: UserInput  }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      console.log(data); 
      });
    }
                                                                     // Artist(s)
                                                                     // The song's name
                                                                     // A preview link of the song from Spotify
                                                                     // The album that the song is from


    // ------------------------------------fs
    function fs(){
    fs.readFile('/random', function (err) {
      if (err) throw err;
      console.log('successfully ......');
    });
        }
    //-----------------------------------log.txt



    //-------exicute-----

      UserInputs (liriOption, UserInput);