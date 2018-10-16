function updateClock() {
  var clock = moment().format("h:mm:ss a");

  var clock1 = $("<h2>");
  var clock2 = clock1.append(clock);
  $("#clock").html(clock2);
}

setInterval(updateClock, 1000);

var database = firebase.database();

$("#add-train-btn").click(function(event) {
  event.preventDefault();
  var newTrain = $("#train-name-input")
    .val()
    .trim();
  var newDestination = $("#destination-input")
    .val()
    .trim();
  var newFirstTrain = $("#first-train-input")
    .val()
    .trim();
  var newFrequency = $("#frequency-input")
    .val()
    .trim();

  newObject = {
    train: newTrain,
    destination: newDestination,
    firstTrain: newFirstTrain,
    frequency: newFrequency
  };
  database.ref().push(newObject);

  alert("Train added!");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  var newTrain = childSnapshot.val().train;
  var newDestination = childSnapshot.val().destination;
  var newFirstTrain = childSnapshot.val().firstTrain;
  var newFrequency = childSnapshot.val().frequency;

  var firstTrainConverted = moment(newFirstTrain, "hh:mm").subtract(1, "days");

  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

  var timeApart = diffTime % newFrequency;

  var minutesAway = newFrequency - timeApart;

  var nextArrival = moment().add(minutesAway, "minutes");

  var nextArrival2 = moment(nextArrival).format("hh:mm");

  $("#train-table > tbody").append(
    "<tr><td>" +
      newTrain +
      "</td> <td>" +
      newDestination +
      "</td> <td>" +
      newFrequency +
      "</td><td>" +
      nextArrival2 +
      "</td><td>" +
      minutesAway +
      "</td></tr>"
  );
});
