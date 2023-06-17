"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSearchableFields = exports.studentFilterableFields = exports.bloodGroup = exports.gender = void 0;
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
exports.studentFilterableFields = [
    'searchTerm',
    'id',
    'bloodGroup',
    'email',
    'contactNo',
    'emergencyContactNo',
];
exports.studentSearchableFields = [
    'id',
    'email',
    'contactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
