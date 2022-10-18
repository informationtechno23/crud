const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./routes/userRouter");

const app = express();

app.use(bodyParser.json()); // application/json

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/api/", userRouter);

app.get("/", (req, res) => {
    res.json({
        "setup": [
            "cd server",
            "npm install",
            "npm start"
        ],
        "routes": [{
            "get all users": {
                "url": "http://localhost:8000/api/?from=0&limit=25",
                "method": "GET",
                "status": {
                    "success": "200",
                    "fail": "204",
                }
            },
            "get one user": {
                "url": "http://localhost:8000/api/:id",
                "method": "GET",
                "status": {
                    "success": "200",
                }
            },
            "create": {
                "url": "http://localhost:8000/api/create",
                "method": "POST",
                "status": {
                    "success": "201",
                    "fail | validation error": "422"
                }
            },
            "delete": {
                "url": "http://localhost:8000/api/delete/:id",
                "method": "DELETE",
                "status": {
                    "success": "202",
                    "fail": "204"
                }
            },
            "edit": {
                "url": "http://localhost:8000/api/edit/:id",
                "method": "PUT",
                "status": {
                    "success": "200",
                    "fail | request created a new record": "201",
                    "fail | validation error": "422",
                }
            },
        }],
        "status": [{
            "200": "request succeeded",
            "201": "creation of a resource is succeeded",
            "202": "deleted successfully",
            "204": "unavailable record",
            "404": "not found",
            "412": "no data available",
            "422": "validation failed"
        }],
        "validate": {
            "name": "name.length >= 3",
            "email": "valid email",
            "mobile": "mobile.length >=7 && mobile.length <=15",
        }
    });
});

const PORT = 3001;

app.listen(PORT);