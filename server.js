// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS must be before routes
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    exposedHeaders: ["Retry-After"], // ✅ add this
  })
);
app.options("*", cors());


// ✅ formidable handler
const submitHandler = require("./api/submit");

// IMPORTANT: Do NOT add express.json() before this route.
app.post("/api/submit", (req, res) => submitHandler(req, res));

// Other JSON routes AFTER submit:
app.use(express.json());

app.get("/health", (_, res) => res.send("OK"));

app.listen(4000, () => {
  console.log("Local API running on http://localhost:4000");
});
