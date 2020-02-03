// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDGKIsxg72fbPdqgJRpiLWV3JVYKlVWVd0",
    authDomain: "artist-junk.firebaseapp.com",
    databaseURL: "https://artist-junk.firebaseio.com",
    storageBucket: "artist-junk.appspot.com",
    messagingSenderId: "252265308166",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Create a variable to reference the database.
  var database = firebase.database();
  // Link to Firebase Database for viewer tracking
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snapshot) {
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snapshot.numChildren());
});
//==========================================================================
//functions for page two
function searchArtist (artist) {
    var settings = {
	"async": true,
    "crossDomain": true,
    //this is the api for deezer
	"url": `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "64dadda246mshebabf90dabe358cp1e0734jsnd76ccf9055f8"
	}
}
$.ajax(settings).done(function (response) {
	console.log(response);

 // Using jQuery, append information to corresponding divs:
    var artistDiv = $("#artist-info");
    artistDiv.empty;
    // var artName = response.data[0].artist.name;
    // console.log(artName);
    // var artNameP = $("<p>").text("Artist: " + artName);
    // artistDiv.append(artNameP)
//grab a picture of the artist.
    // var artistPicture = $("#artist-pic");
    // var pic = response.data[0].artist.picture;
    // var image = $("<img>").attr("src", pic)
    // artistPicture.append(image);
//play a preview of the song
    var playDiv = $("#play");
    var playSong = response.data[0].preview;
    console.log(playSong);
    var song = new Audio(playSong);
    song.play();
    // playDiv.append(playSong);
    playDiv.append(song);
  });
};
  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchArtist(artist);
  });