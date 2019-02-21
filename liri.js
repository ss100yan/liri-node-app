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
       
        console.log("**********Events for"+" "+ UserInput +"*********");
      
         var concerts= response;

        for (var i = 0; i < concerts.data.length; i++) {  

          console.log(i+1);

          console.log("Venue Name: " +concerts.data[i].venue.name);
                          
          console.log("Venue Location: " +concerts.data[i].venue.city);
        
          console.log("Date of the Event: "+concerts.data[i].datetime);  //  (use moment to format this as "MM/DD/YYYY")
        
               
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
   

                       

            //--------------------OMDB
    function omdb(UserInput){

      if (UserInput==null){UserInput='Mr. Nobody.'}


      var queryUrl = " http://www.omdbapi.com/?t=" + UserInput + " &y=&plot=short&apikey=ed4f19eb";
     

      axios.get(queryUrl)
        .then(function (response) {
             
          console.log("**********Movie Info for"+" "+ UserInput +"*********");

          console.log("Title: " + response.data.Title);

          console.log("Release Year: " + response.data.Year);

          console.log("IMDB Rating: " + response.data.imdbRating);
          
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings); // ???????
          
          console.log("Country of production: " + response.data.Country);
          
          console.log("Language: " + response.data.Language);
          
          console.log("Plot: " + response.data.Plot);

          console.log("Actors: " + response.data.Actors);

        })
        .catch(function (error) {
          console.log(error);
        });
      }
                                                                    
                                          //function to get proper Rotten Tomatoes Rating
                            //  function getRottenTomatoesRatingObject (data) {
                            //  return data.Ratings.find(function (item) {
                            //     return item.Source === "Rotten Tomatoes";
                            //       });
                            //       }

                            //      function getRottenTomatoesRatingValue (data) {
                            //     return getRottenTomatoesRatingObject(data).Value;
                                //  }                              
     
     //------------------Spotify

      function spfy(UserInput){
      spotify.search({ type: 'track', query: UserInput  }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
     console.log("**********Spotify Info for the song-'"+ UserInput+  "'*********");
      console.log('Artist(s) -'+" "+ data.tracks.items[1].album.artists[0].name); 
      console.log("The song's name -"+" "+ data.tracks.items[1].album.artists[0].name); 
      console.log('A preview link of the song from Spotify -'+" "+ data.tracks.items[1].album.artists[0].name); 
      console.log('The album that the song is from -'+" "+ data.tracks.items[1].album.artists[0].name); 
      
      });
    }


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