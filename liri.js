require("dotenv").config();

var keys = require('./keys.js');
 var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);
    var axios = require("axios");
      var fs = require('fs');
        var liriOption = process.argv[2]; 
          var UserInput = process.argv.slice(3).join(" ");
            
            var moment = require('moment');

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
                           Fs();
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

         console.log("-------------Events for"+" "+ UserInput +"-----------------"+"\n");

             var concerts= response;

                 for (var i = 0; i < concerts.data.length; i++) {  

                     console.log(i+1);

                        console.log("Venue Name: " +concerts.data[i].venue.name+"\n");

                          console.log("Venue Location: " +concerts.data[i].venue.city+"\n");

                             //----------------------- Moment------

                                var Dtime = moment(concerts.data[i].datetime).format('L');

                                    console.log("Date of the Event: "+Dtime+"\n"); 

                                    fs.appendFileSync("log.txt", "-------------Events for"+" "+ UserInput +"-----------------"+"\n");
   
                                  fs.appendFileSync("log.txt",i+1+"\n");

                              fs.appendFileSync("log.txt","Venue Name: " +concerts.data[i].venue.name+"\n");
     
                        fs.appendFileSync("log.txt","Venue Location: " +concerts.data[i].venue.city+"\n");
     
                   fs.appendFileSync("log.txt","Date of the Event: "+Dtime+"\n");
        
                  }
               })
           .catch(function (error) {
        console.log(error);
      });
    }
       

         //--------------------OMDB-----------
    function omdb(UserInput){

      if (UserInput==null){UserInput='Mr. Nobody.'};


      var queryUrl = " http://www.omdbapi.com/?t=" + UserInput + " &y=&plot=short&apikey=ed4f19eb";
     

      axios.get(queryUrl)
        .then(function (response) {
             
          console.log("------------Movie Info for"+" "+ UserInput +"--------------"+"\n");

          console.log("Title: " + response.data.Title+"\n");

          console.log("Release Year: " + response.data.Year+"\n");

          console.log("IMDB Rating: " + response.data.imdbRating+"\n");
          
          console.log("Rotten Tomatoes Rating: " +  RottenTomatoes(response.data)+"\n");
          
          console.log("Country of production: " + response.data.Country+"\n");
          
          console.log("Language: " + response.data.Language+"\n");
          
          console.log("Plot: " + response.data.Plot+"\n");

          console.log("Actors: " + response.data.Actors+"\n");

         fs.appendFileSync("log.txt", "------------Movie Info for"+" "+ UserInput +"--------------"+"\n");
   
         fs.appendFileSync("log.txt","Title: " + response.data.Title+"\n");

         fs.appendFileSync("log.txt","Release Year: " + response.data.Year+"\n");
     
         fs.appendFileSync("log.txt","IMDB Rating: " + response.data.imdbRating+"\n");
     
         fs.appendFileSync("log.txt","Rotten Tomatoes Rating: " +  RottenTomatoes(response.data)+"\n");
    
         fs.appendFileSync("log.txt","Country of production: " + response.data.Country+"\n");
     
         fs.appendFileSync("log.txt","Language: " + response.data.Language+"\n");
   
         fs.appendFileSync("log.txt","Plot: " + response.data.Plot+"\n");

         fs.appendFileSync("log.txt","Actors: " + response.data.Actors+"\n");
                 

         
        })
        .catch(function (error) {
          console.log(error);
        });
      }
                                                                    
    //-------------------Rotten Tomatoes Rating

    function RTObject (data) {
        return data.Ratings.find(function (item) {
              return item.Source === "Rotten Tomatoes";
                    });
                       }
                         function RottenTomatoes (data) {
                           return RTObject(data).Value;
                             }                              
     
     //------------------Spotify------------------------------------------------

      function spfy(UserInput){

        // "The Sign"; //default Song
        if (UserInput==null){UserInput="The Sign"};

      spotify.search({ type: 'track', query: UserInput  }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for (i=0; data.tracks.items.length; i++ )
        {
      console.log("---------Spotify Info------------"+"\n");

      console.log('Artist(s) -'+" "+ data.tracks.items[i].artists[0].name+"\n"); 

      console.log("The song's name -"+" "+ data.tracks.items[i].name+"\n"); 

      console.log('A preview link  -'+" "+ data.tracks.items[i].preview_url +"\n"); 

      console.log('The album  -'+" "+ data.tracks.items[i].album.name+"\n"); 



      fs.appendFileSync("log.txt", "---------Spotify Info------------\n");
   
      fs.appendFileSync("log.txt", i +"\n");

      fs.appendFileSync("log.txt", "artist(s): " + data.tracks.items[i].artists[0].name + "\n");
     
      fs.appendFileSync("log.txt", "song name: " + data.tracks.items[i].name +"\n");
     
      fs.appendFileSync("log.txt", "preview song: " + data.tracks.items[i].preview_url +"\n");
    
      fs.appendFileSync("log.txt", "album: " + data.tracks.items[i].album.name + "\n");
     
      
     
            }
      });
    }


    // -------------fs() from random.txt---------
    
function Fs(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		if (err){ 
			return console.log(err);
		}
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr.slice(1).join(" "));
	});
}


 

      UserInputs (liriOption, UserInput);
    