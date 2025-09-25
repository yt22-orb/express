const Employee = require('../models/Employee');

const employeeController = {};

// List employees
employeeController.list = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.render("employee/index", { employees });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
};

// Show one employee
employeeController.show = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render("employee/show", { employee }); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
};

// Render create form
employeeController.create = (req, res) => {
  // Always initialize errors and employee (for pre-filling on form re-render)
  res.render("employee/create", { errors: [], employee: {} }); 
};

// Save new employee
employeeController.save = async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      salary: req.body.salary,
      // 'updated_at' is now handled by timestamps: true in the schema
    });

    await employee.save();
    console.log("✅ Successfully created an employee.");
    res.redirect("/employees/show/" + employee._id);

  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      // Pass back the submitted data (req.body) to pre-fill the form
      return res.status(400).render("employee/create", { 
        errors: validationErrors,
        employee: req.body
      });
    }
    res.status(500).send("Internal server error");
  }
};

// Render edit form
employeeController.edit = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    // CRITICAL FIX: Pass 'errors' as an empty array when loading the edit form initially
    res.render("employee/edit", { employee, error: null, errors: [] }); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
};

// Update employee
employeeController.update = async (req, res) => {
  try {
    // runValidators: true is CRITICAL for Mongoose to check the 'required' fields on update
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) return res.status(404).send("Employee not found");
    res.redirect("/employees/show/" + employee._id);
  } catch (err) {
    console.error("Update error:", err);

    // Prepare the submitted data, including the ID, to re-render the form
    let submittedData = { 
      ...req.body, 
      _id: req.params.id 
    };

    if (err.name === "ValidationError") {
      const validationErrors = Object.values(err.errors).map(e => e.message);
      // Pass back submitted data and validation errors
      return res.status(400).render("employee/edit", { 
        employee: submittedData, 
        error: null, 
        errors: validationErrors 
      });
    }
    
    // Non-validation errors: Pass empty errors array to avoid crashing the view
    res.status(400).render("employee/edit", { 
      employee: submittedData, 
      error: "Failed to update employee: " + err.message, 
      errors: [] 
    });
  }
};

// Delete employee
employeeController.delete = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).send("Employee not found");
    console.log("🗑️ Successfully deleted an employee.");
    res.redirect("/employees");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = employeeController;