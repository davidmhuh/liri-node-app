require("dotenv").config();
var request = require("request");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var commands = process.argv[2];
var fs = require("fs");




var concertThis = function() {

var artistName = process.argv.slice(3).join("")
console.log(artistName)
var URL = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"

request(URL, function(error, response, body){

    if (!error && response.statusCode === 200) {

        var event = JSON.parse(body)[0]
    
        console.log("The name of the venue is: " + event.venue.name);
        console.log("The venue location is: " + event.venue.city);
        console.log("The date of the venue is: " + moment(event.datetime).format("MM/DD/YYYY"));
    }
    else {
        console.log(error)
    }
});

}
var spotifyThisSong = function() {
   
  spotify
    .search({ type: 'track', query: process.argv.slice(3).join(""), limit: "1"})
    .then(function(response) {

      console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
      console.log("The Song: " + response.tracks.items[0].name);
      console.log("The Preview Link: " + response.tracks.items[0].preview_url);
      console.log("Album from where the song originates: " + response.tracks.items[0].album.name);

    })
    .catch(function(err) {
      console.log(err);
    });
  }
    

  var movieThis = function() {

var movieName = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("imdbRating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
  }

  var doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (!error) {
        return console.log(error);
      }

      dataArr = data.split(",");
      spotifyThisSong(dataArr[0]);

    }
    )};

  
if (commands === "concert-this") {
  concertThis();
}

else if (commands === "spotify-this-song") {
  spotifyThisSong();
}

else if (commands === "movie-this") {
  movieThis();
}

else if (commands === "do-what-it-says") {
  doWhatItSays();
}

else {
  console.log(ERRRRRRRRRRRORRRRRRRRRRRRRRRRRRRRRR)
}