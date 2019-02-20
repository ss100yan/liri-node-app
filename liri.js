require("dotenv").config();


//-------------- variables


var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

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
      // code block
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

      //------------------Spotify
      function spfy(UserInput){
      spotify.search({ type: 'track', query: UserInput  }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
      console.log(data); 
      });
    }

    //-------exicute-----

      UserInputs (liriOption, UserInput);