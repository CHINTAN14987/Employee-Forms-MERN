const express = require("express");
require("./db/config");
const employee = require("./db/Model");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/employee-registration", async (req, res) => {
  let emp = new employee(req.body);
  let response = await emp.save();
  res.send(response);
});
app.get("/employees", async (_, res) => {
  let emp = await employee.find();
  res.send(emp);
});
app.post("/new-employees-list", async (req, res) => {
  try {
    await employee.deleteOne(req.body);
    if (res.status(200)) {
      res.send("succesfully deleted employee from the list");
    }
  } catch (error) {
    res.status(500).send("Error deleting employee from the database.");
  }
});
app.put("/employee-update/:_id", async (req, res) => {
  try {
    await employee.updateOne(
      { _id: req.params._id },
      {
        $set: req.body,
      }
    );
    if (res.status(200)) {
      res.send("succesfully updated employee from the list");
    }
  } catch (error) {
    res.status(500).send("Error updating employee from the database.");
  }
});
app.listen(5000);
