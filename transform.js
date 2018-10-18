<<<<<<< HEAD
const fs = require("fs");
=======
// console.log('hello');

const fs = require('fs');
>>>>>>> 9a119df351529cef0e1e7582511eedd58234fda4

const file = 'data/test.json'; // choose input file
const inTxt = fs.readFileSync(file, 'utf8'); // function to read file
const input = JSON.parse(inTxt);

const output = []; //puts output in empty array
const userIds = {}; //puts output in object notation
var nextId = 1;

for (const inItem of input) {
  const outItem = {};

  // copy _id field
  outItem._id = inItem._id;

  // map user ID
  const inId = inItem.userId;
  var outId = userIds[inId];
  if (outId === undefined) {
  	outId = nextId++;
  	userIds[inId] = outId;
  }
  outItem.userId = outId;

<<<<<<< HEAD
  // date of the night
  outItem.date = inItem.data.sessionStartTime;
  outItem.date = inItem.data.sessionEndTime;
=======
<<<<<<< HEAD
=======
  // date
  outItem.date = inItemnode.createdAt;
>>>>>>> 9a119df351529cef0e1e7582511eedd58234fda4

>>>>>>> 78666dae9099c18bc7426de838ac5a4984f9061b
  // copy heart rate
  outItem.sleepingHeartRate = inItem.data.sleepingHeartRate;
  // convert -7

  // count SleepStages
  outItem.count_SLEEP_STAGES = 0;
  outItem.count_WAKE = 0;
  for (const stage of inItem.data.sleepStages) {
  	const name = 'count_' + stage.value;
  	if (outItem[name] === undefined) outItem[name] = 0;
  	outItem[name]++;
  	outItem.count_SLEEP_STAGES++
  }

  // calculations on sleepstages
  outItem.timeSession = outItem.count_SLEEP_STAGES * 30;
  outItem.timeSleep =  outItem.timeSession - outItem.count_WAKE * 30;


  // Add random data; Random heartbeat data and amount of steps in a array
<<<<<<< HEAD
  outItem.averageHeartbeatDuringDay = Math.floor(Math.random() * 60) + 60;
  outItem.AmountofSteps = Math.floor(Math.random() * 5000) + 7000;

  // put into file
=======
  outItem.averigHeartbeatDuringDay = Math.floor(Math.random() * 60) + 60;
  outItem.AmountofSteps= Math.floor(Math.random()*5000)+7000;
  
  
  // put into file 
>>>>>>> 9a119df351529cef0e1e7582511eedd58234fda4
  output.push(outItem);
}

  //write to new .json file
	const outTxt = JSON.stringify(output, null, 2);
	fs.writeFileSync('output.json', outTxt + '\n', 'utf8');
// console.log(output);
