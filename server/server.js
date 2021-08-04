const express = require("express");
const { userRoutes } = require("./routes/users");
const { chatRoutes } = require("./routes/chats");
const { authRoutes } = require("./routes/auth");
const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
