const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    department: String,
  },
  { collection: "emp" }
);

module.exports = mongoose.model("emp", employeeSchema);
