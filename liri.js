//this includes our dotenv file into the program
require("dotenv").config();
var request = require("request");

//creates a new sportify variable that holds files from the spotify api
var Spotify = require('node-spotify-api');

//the keys variable holds api keys
var keys = require('./keys.js');

//create an instance of the spotify variable along with the api keys
var spotify = new Spotify(keys.spotify);


//this will select which function or app we are going to execute
var selectApp = process.argv[2];

//this will hold the content to search for in the app
var selectArray = process.argv;
//if there is more than one argument for the user choice content, connect them


//create constant variables for the list of selections
const selectionSpofity = "spotify-this-song";
const selectionBands = "concert-this";
const selectionMovie = "movie-this";
const doSays = "do-what-it-says";

var contentApp = initData();
//selects the options 
selectOptions();


function getMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + contentApp + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var temp = JSON.parse(body);
            console.log("---------------------");

            console.log("Movie Name: " + temp.Title);
            console.log("Release Date: " + temp.Released);
            console.log("Rotten Tomatoes Rating: " + temp.Ratings[1].Value);
            console.log("Country produced: " + temp.Country);
            console.log("Language: " + temp.Language);
            console.log("Plot: " + temp.Plot);
            console.log("Actors: " + temp.Actors);
        }
    });

}
function readFile() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        //split the data so it turns into an array
        var dataArray = data.split(",");

        //set our main variables to the content inside the text file
        selectApp = dataArray[0];
        contentApp = dataArray[1];
        getSpotify();
    })
}

function getBands() {


    request("https://rest.bandsintown.com/artists/" + contentApp + "/events?app_id=400d5aa1c8515365e2be7cf76cfd8ad9", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
        }
    });
}



function getSpotify() {
    spotify.search({ type: 'track', query: contentApp, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("---------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("From Album: " + data.tracks.items[0].album.name);


    });
}




function selectOptions() {
    if (selectApp == selectionSpofity) {
        getSpotify();
    }
    if (selectApp == selectionBands) {
        getBands();
    }
    if (selectApp == selectionMovie) {
        getMovie();
    }
    if (selectApp == doSays) {
        readFile();
    }
}


function initData() {
    //creates a temp variable
    var temp = "";

    if (selectApp == selectionBands) {
        for (var i = 3; i < selectArray.length; i++) {

            if (i >= (selectArray.length - 1)) {
                temp += `${selectArray[i]}`
            } else {
                temp += `${selectArray[i]}%20`;
            }
        }
    }
    else {
        //concatinates if there are arguments passed 3
        for (var i = 3; i < selectArray.length; i++) {
            temp += ` ${selectArray[i]}`;
        }
        //sends back concatination
    }
    console.log("TEMP: " + temp);
    return temp;
}

