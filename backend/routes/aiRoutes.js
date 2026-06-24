const express = require("express");
const router = express.Router();

const { askTutor , evaluateEmail,} = require("../controllers/aiController");

router.post("/ask", askTutor);

router.post("/evaluate-email", evaluateEmail);

module.exports = router;
