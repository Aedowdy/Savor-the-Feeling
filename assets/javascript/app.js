// VISION API ====================================

function processImage() {
  // Replace <Subscription Key> with your valid subscription key.
  // Free trial key only lasts 7 days, good until 9-8-18
  var subscriptionKey = "7e04d168a4614ef088fbd8b6b1eb4d00";

  // NOTE: You must use the same region in your REST call as you used to
  // obtain your subscription keys. For example, if you obtained your
  // subscription keys from westus, replace "westcentralus" in the URL
  // below with "westus".
  //
  // Free trial subscription keys are generated in the westcentralus region.
  // If you use a free trial subscription key, you shouldn't need to change
  // this region.
  var uriBase =
    "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    returnFaceId: "true",
    returnFaceLandmarks: "false",
    returnFaceAttributes:
      "age,gender,headPose,smile,facialHair,glasses,emotion," +
      "hair,makeup,occlusion,accessories,blur,exposure,noise"
  };

  // Display the image.
  var sourceImage = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImage;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),

    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type", "application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },

    type: "POST",

    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}' // pull the Canvas ID
  })

    .done(function(data) {
      // Show formatted JSON on webpage.
      $("#responseTextArea").val(JSON.stringify(data, null, 2));

      var test = datafaceAttributes.emotion.anger[0];
      console.log(data);
      console.log(test);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString =
        errorThrown === ""
          ? "Error. "
          : errorThrown + " (" + jqXHR.status + "): ";
      errorString +=
        jqXHR.responseText === ""
          ? ""
          : jQuery.parseJSON(jqXHR.responseText).message
            ? jQuery.parseJSON(jqXHR.responseText).message
            : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
}

// WEBCAM CAPTURE =======================================

// Grab elements, create settings, etc.
var video = document.getElementById("video");

// Elements for taking the snapshot
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var video = document.getElementById("video");

$("#cameraSnap").hide();

// Get access to the camera!
$("#cameraStart").on("click", function() {

   $(this).hide(); 
   $("#cameraSnap").show();
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.src = window.URL.createObjectURL(stream);
      video.play();
    });
  }
});

// Trigger photo take
$("#cameraSnap").on("click", function() {
  context.drawImage(video, 0, 0, 320, 240);
});
