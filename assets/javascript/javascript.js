var config = {
    apiKey: "AIzaSyCBTD2El-aK1_BlkrO0hbwAJCZJVVw0h1Y",
    authDomain: "train-scheduler-1df2a.firebaseapp.com",
    databaseURL: "https://train-scheduler-1df2a.firebaseio.com",
    projectId: "train-scheduler-1df2a",
    storageBucket: "",
    messagingSenderId: "131673706150"
  };
  firebase.initializeApp(config);

var database = firebase.database();



$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = $("#frequency-input").val().trim();



    // Creates local "temporary" object for holding train data
    var trainRef = database.ref("/trains");
    var newTrainRef = trainRef.push();
    newTrainRef.set({
        name: trainName,
        destination: trainDest,
        startTime: trainTime,
        frequency: trainFreq
    })
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

});

database.ref("/trains").on("child_added", function(snapshot){
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().destination;
    var trainTime = snapshot.val().startTime;
    var trainFreq = snapshot.val().frequency;
 
var firstTimeConverted = moment(trainTime, "HH:mm")
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFreq;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$(".table").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
trainTime + "</td><td>" + trainFreq+ "</td><td>" +tMinutesTillTrain);
 console.log(trainName);
})    
    