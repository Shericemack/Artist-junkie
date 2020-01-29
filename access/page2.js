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
    var artName = response.data[0].artist.name;
    console.log(artName);
    var artNameP = $("<p>").text("Artist: " + artName);
    artistDiv.append(artNameP)
//grab a picture of the artist.
    var artistPicture = $("#artist-pic");
    var pic = response.data[0].artist.picture;
    var image = $("<img>").attr("src", pic)
    artistPicture.append(image);
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