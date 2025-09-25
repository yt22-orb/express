const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/EmployeeController.js");

// Get all employees
router.get("/", employeeController.list);

// Get single employee by id
router.get("/show/:id", employeeController.show);

// Create employee
router.get("/create", employeeController.create);

// Save employee
router.post("/save", employeeController.save);

// Edit employee
router.get("/edit/:id", employeeController.edit);

// Update employee
router.post("/update/:id", employeeController.update);

// Delete employee
// 💥 FIX: Change the delete method from POST to GET to match the link on the list page
router.get("/delete/:id", employeeController.delete); 

// ✅ Export router correctly
module.exports = router;