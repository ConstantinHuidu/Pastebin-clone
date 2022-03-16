const express = require('express');
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');


const pastesRouter = require('./routes/pastes');
app.use('/pastes', pastesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});