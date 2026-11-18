import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

const sendTimestamp = (res, date) => {
  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
};

// Empty date parameter: current time
app.get("/api", (_req, res) => {
  sendTimestamp(res, new Date());
});

app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  // A string of only digits is a Unix timestamp in milliseconds
  const parsed = /^-?\d+$/.test(date) ? new Date(Number(date)) : new Date(date);
  sendTimestamp(res, parsed);
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
