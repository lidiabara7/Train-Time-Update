// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBjWGazSYipVG0KWuNE3FiZ5_NsGfJEB1E",
  authDomain: "train-update.firebaseapp.com",
  databaseURL: "https://train-update.firebaseio.com",
  projectId: "train-update",
  storageBucket: "train-update.appspot.com",
  messagingSenderId: "223401844616",
  appId: "1:223401844616:web:504dd58d0fbae2d6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database
var database = firebase.database();

//need to create a button for users to add their train info and update the html file.
$("#add-train").on("click", function (event) {
  event.preventDefault();

  //garab info from the user input
  var trainName = $("#Trainname-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#First-train-time").val().trim();
  var frequency = $("#frequency-input").val().trim();

  //create a local temp object to hold train data
  var trainData = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };
  //to upload train data to the database
  database.ref().push(trainData);

  console.log(trainData.name);
  console.log(trainData.destination);
  console.log(trainData.firstTrain);
  console.log(trainData.frequency);

  //to clear the text boxes
  $("#Trainname-input").val("");
  $("#destination-input").val("");
  $("#First-train-time").val("");
  $("#frequency-input").val("");
});

//to get the user input from firebase to the html file
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  //storing info into a variable
  var trainName = childSnapshot.val().name;
  var traindestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  //need to get the next arrival and minutes away
  //first time
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  //to append the info to a new table row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(traindestination),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency)
  );

  $("#train-table > tbody").append(newRow);
});








