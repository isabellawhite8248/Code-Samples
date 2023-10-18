import express from "express";
const app = express();
const PORT = 5001; // change to process.env.PORT for production

// start the express web server listening on 5001
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});

app.get("/testApi", (req, res) => {
  res.json({ users: ["userOne", "userTwo"] });
});

app.get("*", (req, res) => {
  res.send("Siege Trading Backend Service");
});
