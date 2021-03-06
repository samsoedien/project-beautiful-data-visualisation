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

//const agendaItems = [];
let agendaItems;

for (const inItem of sleepInput) {
  const outItem = {};

  // copy _id field
  outItem._id = inItem._id.$oid;

  let id = inItem._id.$oid;

  // map userID
  const inId = inItem.userId;
  let outId = userIds[inId];
  if (outId === undefined) {
    outId = nextId++;
    userIds[inId] = outId;
  }
  outItem.userId = outId;

  // date of the night
  // outItem.unconvertedSessionStartTime = inItem.sessionStartTimeIsoDate.$date;
  // outItem.unconvertedSessionEndTime = inItem.sessionEndTimeIsoDate.$date;

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
  let timeSession = outItem.count_SLEEP_STAGES * 30;
  //outItem.timeSleep = outItem.timeSession - outItem.count_WAKE * 30;

  outItem.timeSessionMinutes = (outItem.count_SLEEP_STAGES * 30) / 60;
  outItem.timeSleepMinutes = (timeSession - outItem.count_WAKE * 30) / 60;

  // put into file
  output.push(outItem);

  for (const inItem of calendarInput) {
    const outItem = {};

    // map userID
    const inId = inItem.id;
    let outId = userIds[inId];
    if (outId === undefined) {
      outItem._id = id;

      agendaItems = inItem;

      if (agendaItems.colorId === "10") {
        agendaItems.colorId = "Travel";
      } else if (agendaItems.colorId === "11") {
        agendaItems.colorId = "Work";
      } else if (agendaItems.colorId === "3") {
        agendaItems.colorId = "Leisure";
      } else if (agendaItems.colorId === "5") {
        agendaItems.colorId = "Sport";
      } else if (agendaItems.colorId === "6") {
        agendaItems.colorId = "Children";
      } else if (agendaItems.colorId === "9") {
        agendaItems.colorId = "Chores";
      } else {
        //agendaItems.colorId = "Activity not defined";
      }

      outItem.eventSummary = agendaItems.summary;
      outItem.eventActivity = agendaItems.colorId;
      outItem.eventStart = agendaItems.start.dateTime;
      outItem.eventEnd = agendaItems.end.dateTime;

      output.push(outItem);

      outId = nextId++;
      userIds[inId] = outId;
      break;
    }
  }
}

let arr = output,
  result = Object.values(arr.reduce((a, c) => {
    Object.assign((a[c['_id']] || (a[c['_id']] = Object.create(null))), c);
    return a;
  }, Object.create(null)));

console.log(result);

//write to new .json file
const outTxt = JSON.stringify(result, null, 2);
fs.writeFileSync("data/sleepdata.json", outTxt + "\n", "utf8");
// console.log(output);
