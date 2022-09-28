const express = require("express");
const app = express();

app.use("/api/", (req, res) => {
    res.json({ "users": ["hamza", "sorani"] });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));