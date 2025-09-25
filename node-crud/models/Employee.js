const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Employee name is required.'], 
        trim: true 
    },
    address: {
        type: String,
        required: [true, 'Employee address is required.'], 
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Employee position is required.'], 
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Employee salary is required.'], 
        min: [0, 'Salary cannot be negative.'] 
    }
}, { 
    timestamps: true 
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;