// $( document ).ready(function() {
//     // An array of actions, new actions will be pushed into this array;
//     var actions = ["happy", "sad", "angry", "confused", "neutral"];
//     // Creating Functions & Methods
//     // Function that displays all gif buttons
//     function displayGifButtons(){
//         $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
//         for (var i = 0; i < actions.length; i++){
//             var gifButton = $("<button>");
//             gifButton.addClass("action");
//             gifButton.addClass("btn btn-primary")
//             gifButton.attr("data-name", actions[i]);
//             gifButton.text(actions[i]);
//             $("#gifButtonsView").append(gifButton);
//         }
//     }
//     // Function to add a new action button
//     function addNewButton(){
//         $("#addGif").on("click", function(){
//         var action = $("#action-input").val().trim();
//         if (action == ""){
//           return false; // added so user cannot add a blank button
//         }
//         actions.push(action);
    
//         displayGifButtons();
//         return false;
//         });
//     }
//     // Function to remove last action button
//         // Doesnt work properly yet removes all of the added buttons
//         // rather than just the last
//     function removeLastButton(){
//         $("removeGif").on("click", function(){
//         actions.pop(action);
//         displayGifButtons();
//         return false;
//         });
//     }
//     // Function that displays all of the gifs
//     function displayGifs(){
//         var action = $(this).attr("data-name");
//         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
//         console.log(queryURL); // displays the constructed url
//         $.ajax({
//             url: queryURL,
//             method: 'GET'
//         })
//         .done(function(response) {
//             console.log(response); // console test to make sure something returns
//             $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
//             var results = response.data; //shows results of gifs
//             if (results == ""){
//               alert("There isn't a gif for this selected button");
//             }
//             for (var i=0; i<results.length; i++){
    
//                 var gifDiv = $("<div>"); //div for the gifs to go inside
//                 gifDiv.addClass("gifDiv");
//                 // pulling rating of gif
//                 var gifRating = $("<p>").text("Rating: " + results[i].rating);
//                 gifDiv.append(gifRating);
//                 // pulling gif
//                 var gifImage = $("<img>");
//                 gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
//                 gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
//                 gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
//                 gifImage.attr("data-state", "still"); // set the image state
//                 gifImage.addClass("image");
//                 gifDiv.append(gifImage);
//                 // pulling still image of gif
//                 // adding div of gifs to gifsView div
//                 $("#gifsView").prepend(gifDiv);
//             }
//         });
//     }
//     // Calling Functions & Methods
//     displayGifButtons(); // displays list of actions already created
//     addNewButton();
//     removeLastButton();
//     // Document Event Listeners
//     $(document).on("click", ".action", displayGifs);
//     $(document).on("click", ".image", function(){
//         var state = $(this).attr('data-state');
//         if ( state == 'still'){
//             $(this).attr('src', $(this).data('animate'));
//             $(this).attr('data-state', 'animate');
//         }else{
//             $(this).attr('src', $(this).data('still'));
//             $(this).attr('data-state', 'still');
//         }
//     });
//     });


function emotionFunction(emotion) {
     // when animalContent is called, the input text is assigned a data-name attribute
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?&api_key=8JwY8uq5blrbErSRt2G6FomhnlwmuO1s&limit=4&q=" +
      emotion;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // assigning a variable to the data received
      var emotionData = response.data;
  
      for (var i = 0; i < emotionData.length; i++) {

        imgURL = response.data[i].images.original.url;
  
        // creating a div to store both rating and imgURL
        var emotionDiv = $("<div class='emotion'>");
  
        // creating a div for the gif image
        var emotionImage = $("<img>");
        emotionImage.addClass("gif");
        emotionImage.attr("data-state", "still");
        emotionImage.attr("data-still", imgURLstill);
        emotionImage.attr("data-animate", imgURLanimate);
        

  
        // appending both topicImage and topicRating to topicDiv
        topicDiv.append(topicImage);
  
        // placing topicDiv before the already created topic-view ID div
        $("#topic-view").prepend(topicDiv);
      }
    });
  }