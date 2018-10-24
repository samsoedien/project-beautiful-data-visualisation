const fs = require("fs");

const calendarFile = "data/calenderdata.json"; // choose input file
const inCalendarTxt = fs.readFileSync(calendarFile, "utf8"); // function to read file
const calendarInput = JSON.parse(inCalendarTxt);

const sleepFile = "data/user1.json"; // choose input file
const inSleepTxt = fs.readFileSync(sleepFile, "utf8"); // function to read file
const sleepInput = JSON.parse(inSleepTxt);

const output = []; //puts output in empty array
const userIds = {}; //puts output in object notation
let nextId = 1;

for (const inItem of sleepInput) {

  for (const inItem of calendarInput) {
    const outItem = {};
  
    // outItem.activity = inItem.activity;
    // outItem.period = inItem.period;
  
    // outItem.agendaData = inItem;
  
    // output.push(outItem);
    let agendaItems = inItem;
    return agendaItems;
  }

  const outItem = {};

  // copy _id field
  outItem._id = inItem._id;

  // map userID
  const inId = inItem.userId;
  let outId = userIds[inId];
  if (outId === undefined) {
    outId = nextId++;
    userIds[inId] = outId;
  }
  outItem.userId = outId;

  outItem.agendaData = agendaItems;


  // date of the night
  outItem.unconvertedSessionStartTime = inItem.sessionStartTimeIsoDate.$date;
  outItem.unconvertedSessionEndTime = inItem.sessionEndTimeIsoDate.$date;

  const startTimeISOString = inItem.sessionStartTimeIsoDate.$date;
  const endTimeISOString = inItem.sessionEndTimeIsoDate.$date;

  //time -7 hour
  let startTime = new Date(startTimeISOString);
  startTime = new Date(
    startTime.getTime() + startTime.getTimezoneOffset() * (7 * 30000)
  );

  let endTime = new Date(endTimeISOString);
  endTime = new Date(
    endTime.getTime() + endTime.getTimezoneOffset() * (7 * 30000)
  );

  outItem.sessionStartTime = startTime;
  outItem.sessionEndTime = endTime;

  // copy heart rate
  outItem.sleepingHeartRate = inItem.data.sleepingHeartRate;

  // count SleepStages
  outItem.count_SLEEP_STAGES = 0;
  outItem.count_WAKE = 0;
  for (const stage of inItem.data.sleepStages) {
    const name = "count_" + stage.value;
    if (outItem[name] === undefined) outItem[name] = 0;
    outItem[name]++;
    outItem.count_SLEEP_STAGES++;
  }

  // calculations on sleepstages
  outItem.timeSession = outItem.count_SLEEP_STAGES * 30;
  outItem.timeSleep = outItem.timeSession - outItem.count_WAKE * 30;

  outItem.timeSessionMinutes = (outItem.count_SLEEP_STAGES * 30) / 60;
  outItem.timeSleepMinutes =
    (outItem.timeSession - outItem.count_WAKE * 30) / 60;

  // Add random data; Random heartbeat data and amount of steps in a array
  outItem.averageHeartbeatDuringDay = Math.floor(Math.random() * 60) + 60;
  outItem.amountofSteps = Math.floor(Math.random() * 5000) + 7000;

  // put into file
  output.push(outItem);
}

//write to new .json file
const outTxt = JSON.stringify(output, null, 2);
fs.writeFileSync("data/test1.json", outTxt + "\n", "utf8");
// console.log(output);
