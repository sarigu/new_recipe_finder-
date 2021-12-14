const express = require("express")
const app = express()

const routes = require('./routes');
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

//  RUN SERVER
const port = 8000;

app.listen(port, () => {
    console.log('Server is running on port ', port);
});