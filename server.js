// Collector service (sandbox stand-in): stores results sent by the queuing system's part3-collector.
const express = require("express");

const app = express();
const results = [];
app.use(express.json());
app.post("/results", (req, res) => {
  if (!req.body || typeof req.body.jobId !== "number") return res.status(400).json({ error: "jobId required" });
  results.push({ ...req.body, receivedAt: new Date().toISOString() });
  return res.status(201).json({ stored: results.length });
});
app.get("/healthz", (_req, res) => res.json({ status: "ok" }));
app.listen(process.env.PORT || 3000);
