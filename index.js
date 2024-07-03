const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const cors=require('cors');
const dotenv = require('dotenv');
const expenseRouter = require("./routes/expense");
const app = express();

app.use(cors());
dotenv.config();

app.use((req,res,next)=>{
	console.log("HTTP METHOD - " + req.method + ", URL -" + req.url);
	next();
});

app.use(express.json());

app.use("/users", userRouter);
app.use('/expense',expenseRouter);
app.use('/public', express.static('public'));

mongoose.connect(
    "mongodb://localhost:27017/expense-manager"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started 5000 and connected to Database");
    });
  })
  .catch((err) => {
    console.log(err);
  });