var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/EmployeeController');

// List employees
router.get('/', employeeController.list);

// Create
router.get('/create', employeeController.create);
router.post('/create', employeeController.save);

// Show one employee
router.get('/show/:id', employeeController.show);

// Edit
router.get('/edit/:id', employeeController.edit);
router.post('/edit/:id', employeeController.update);

// Delete
router.get('/delete/:id', employeeController.delete);

module.exports = router;
