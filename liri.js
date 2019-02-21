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
       
        console.log("**********Events for"+" "+ UserInput +"*********"+"\n");
      
         var concerts= response;

        for (var i = 0; i < concerts.data.length; i++) {  

          console.log(i+1);

          console.log("Venue Name: " +concerts.data[i].venue.name+"\n");
                          
          console.log("Venue Location: " +concerts.data[i].venue.city+"\n");
        
          console.log("Date of the Event: "+concerts.data[i].datetime+"\n");  //  (use moment to format this as "MM/DD/YYYY")
        
               
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
             
          console.log("**********Movie Info for"+" "+ UserInput +"*********"+"\n");

          console.log("Title: " + response.data.Title+"\n");

          console.log("Release Year: " + response.data.Year+"\n");

          console.log("IMDB Rating: " + response.data.imdbRating+"\n");
          
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings+"\n"); // ???????
          
          console.log("Country of production: " + response.data.Country+"\n");
          
          console.log("Language: " + response.data.Language+"\n");
          
          console.log("Plot: " + response.data.Plot+"\n");

          console.log("Actors: " + response.data.Actors+"\n");

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
        for (i=0; data.tracks.items.length; i++ )
        {
      console.log("**********Spotify Info for the song-'"+ UserInput+  "'*********"+"\n");

      console.log('Artist(s) -'+" "+ data.tracks.items[i].artists[0].name+"\n"); 

      console.log("The song's name -"+" "+ data.tracks.items[i].name+"\n"); 

      console.log('A preview link of the song from Spotify -'+" "+ data.tracks.items[i].preview_url +"\n"); 

      console.log('The album that the song is from -'+" "+ data.tracks.items[i].album.name+"\n"); 
        }
      });
    }


    // ------------------------------------fs
    function fs(){
    fs.readFile('/random', function (err) {
      if (err) throw err;
      console.log('successfully ......');
    });
        }
  


    //-------execute-----

      UserInputs (liriOption, UserInput);