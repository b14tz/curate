const express = require("express");
const router = express.Router(); // helps create better route handlers and cleans up code

router.get("/test", (req, res) => {
  res.json([
    {
      username: "test_user1",
      age: "sample age",
    },
    {
      username: "test_user2",
      age: "sample age",
    },
  ]);
});

module.exports = router;
