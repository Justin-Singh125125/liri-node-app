//this includes our dotenv file into the program
require("dotenv").config();

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
var contentApp = initData();

//create constant variables for the list of selections
const selectionSpofity = "spotify-this-song";

//selects the options 
selectOptions();




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
}


function initData() {
    //creates a temp variable
    var temp = "";
    //concatinates if there are arguments passed 3
    for (var i = 3; i < selectArray.length; i++) {
        temp += ` ${selectArray[i]}`;
    }
    //sends back concatination
    return temp;
}

