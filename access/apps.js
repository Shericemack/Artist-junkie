function searchBandsInTown(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    // Add code to query the bands in town api searching for the artist received as an argument to this function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);   
      var artistDiv = $("#artist-div");
    // Using jQuery, append the following to the artist-div:
    var artDiv = $("#artist-text");
    artDiv.empty();
    var artPic = $("#artist-pic");
    artPic.empty();
    // The artists thumbnail image
    var pic = response.thumb_url;
    var image = $("<img>").attr("src", pic)
    artPic.append(image);
    // The artist's name
    var artName = response.name;
    var artNameP = $("<p>").text("Artist: " + artName);
    artDiv.append(artNameP)
      // The number of fans tracking this artist
    var fans = response.tracker_count;
    var fansP = $("<p>").text("Fan Count: " +  fans);
    artDiv.append(fansP);
    // The number of upcoming events for this artist
    var events = response.upcoming_event_count;
    var eventsP = $("<p>").text("Upcoming events: " + events);
    artDiv.append(eventsP);
  })
  }
   // Event handler for user clicking the select-artist button
   $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the searchBandsInTown function(passing in the artist as an argument)
    searchBandsInTown(artist);
  });
