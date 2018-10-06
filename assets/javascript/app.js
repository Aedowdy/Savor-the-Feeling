// WEBCAM API ===================================

//list of emotions
// anger: 0
// contempt: 0.002
// disgust: 0
// fear: 0
// happiness: 0.001
// neutral: 0.991
// sadness: 0.005
// surprise: 0

Webcam.set({
  width: 320,
  height: 240,
  image_format: "jpeg",
  jpeg_quality: 90
});
Webcam.attach("#my_camera");

var canvas = document.getElementById("viewport");
var context = canvas.getContext("2d");
var emotion = "confused";

function take_snapshot() {

  $("#images").empty();
  // take snapshot and get image data
  Webcam.snap(function(e) {
    base_image = new Image();
    base_image.src = e;
    base_image.onload = function() {
      context.drawImage(base_image, 0, 0, 320, 240);

      let data = canvas.toDataURL("image/jpeg");

      fetch(data)
        .then(res => res.blob())
        .then(blobData => {
          $.post({
            url:
              "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion",
            contentType: "application/octet-stream",
            headers: {
              "Ocp-Apim-Subscription-Key": "7e04d168a4614ef088fbd8b6b1eb4d00"
            },
            processData: false,
            data: blobData
          })
            .done(function(data) {
              console.log(data);

              if (data["0"].faceAttributes.emotion.anger > 0.6) {
                $("#emotionStatement").text("Wow you are ANGRY!");
                emotion = "angry";
              } else if (data["0"].faceAttributes.emotion.happiness > 0.6) {
                $("#emotionStatement").text("Wow you are HAPPY!");
                emotion = "happy";
              } else if (data["0"].faceAttributes.emotion.sadness > 0.6) {
                $("#emotionStatement").text("Wow you are SAD!");
                emotion = "sadness";
              } else if (data["0"].faceAttributes.emotion.neutral > 0.6) {
                $("#emotionStatement").text("Wow you FEEL NOTHING!");
                emotion = "boring";
              } else {
                $("#emotionStatement").text(
                  "I'm CONFUSED! You're like my boss, I can never tell what you're thinking!"
                );
              }

              //call giphy api with var 
              console.log(emotion);
              emotionFunction(emotion);
              //
              //
              //
            })
            .fail(function(err) {
              console.log(err);
              // $("#results").text(JSON.stringify(err));
            });
        });
    };
  });
}

// GIPHY API =========================================

function emotionFunction(emotion) {
  // when animalContent is called, the input text is assigned a data-name attribute
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?&api_key=8JwY8uq5blrbErSRt2G6FomhnlwmuO1s&limit=10&q=" +
    emotion;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // assigning a variable to the data received
    var emotionData = response.data;

    console.log(emotionData);

    for (var i = 0; i < emotionData.length; i++) {
      imgURL = response.data[i].images.original.url;

      var emotionGif = $("<img>");
      emotionGif.attr("src", imgURL);
      emotionGif.attr("alt", emotion);

      console.log (imgURL);
      $("#images").prepend(emotionGif);
    }
  });
}

// YOUTUBE API ===============================


      // Client ID and API key from the Developer Console
      var CLIENT_ID = '<354590734259-ekn605em0k9odugm8c27b1dhohlms2b3.apps.googleusercontent.com>';

      