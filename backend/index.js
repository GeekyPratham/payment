const express = require("express");
const app = express();
// Middleware to parse incoming JSON requests
app.use(express.json());
const cors = require("cors")
app.use(cors());

const mainRouter = require("./routes/index") // // Import the routes from the 'routes' folder



app.use("/api/v1" ,mainRouter) // all routes will start with /api/v1

app.listen(5000,()=>{
    console.log('Server running on port 5000');
});