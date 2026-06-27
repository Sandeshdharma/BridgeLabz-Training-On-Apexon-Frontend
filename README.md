# Employee Payroll

A responsive Employee Payroll Management application built using HTML5, CSS3, JavaScript, jQuery, AJAX, and JSON Server. The application allows users to manage employee records with complete CRUD functionality.

---

## Project Overview

The Employee Payroll application enables users to:

- Add new employees
- Update employee details
- Delete employee records
- Search employees by name
- View all employee information
- Store employee data using JSON Server
- Perform CRUD operations using AJAX (jQuery)

---

## Technologies Used

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| HTML5            | Structure of the application |
| CSS3             | Styling and Responsive UI    |
| JavaScript (ES6) | Business Logic               |
| jQuery           | DOM Manipulation & Events    |
| AJAX             | API Communication            |
| JSON Server      | Mock REST API                |
| Git              | Version Control              |
| GitHub           | Source Code Repository       |

---

## Project Structure

```
EmployeePayroll
│
├── Assets
│   └── Images
│
├── Scripts
│   ├── addEmployee.js
│   ├── dashboard.js
│   └── api.js
│
├── Styles
│   ├── dashboard.css
│   └── addEmployee.css
│
├── Templates
│   ├── dashboard.html
│   └── addEmployee.html
│
├── db.json
└── README.md
```

---

## Features

### Dashboard

- View employee list
- Search employee by name
- Delete employee
- Edit employee
- Add Employee button

---

### Add Employee

- Name Validation
- Profile Image Selection
- Gender Selection
- Department Selection
- Salary Selection
- Start Date
- Notes
- Duplicate Employee Validation

---

### CRUD Operations

- Create Employee
- Read Employee
- Update Employee
- Delete Employee

---

### API Integration

AJAX is used to communicate with JSON Server.

Supported API operations:

- GET Employees
- GET Employee by ID
- POST Employee
- PUT Employee
- DELETE Employee

---

## How to Run the Project

### Step 1

Clone the repository

```bash
git clone https://github.com/Sandeshdharma/BridgeLabz-Training-On-Apexon-Frontend.git
```

---

### Step 2

Navigate into the project

```bash
cd BridgeLabz-Training-On-Apexon-Frontend
```

---

### Step 3

Install JSON Server

```bash
npm install -g json-server
```

---

### Step 4

Start JSON Server

```bash
json-server --watch db.json --port 3000
```

---

### Step 5

Open

```
Templates/dashboard.html
```

using Live Server.

---

## API Endpoint

```
http://localhost:3000/employees
```

---

## Screenshots

### Dashboard

![Dashboard](Assets/ScreenShots/Dashboard-Screenshot.jpeg)

---

### Add Employee Form

![Add Employee Form](Assets/ScreenShots/AddEmployee-Form-Screenshot.jpeg)

## Learning Outcomes

During this project, I learned:

- HTML5 Structure
- CSS Layout Design
- Responsive UI
- JavaScript ES6
- DOM Manipulation
- Form Validation
- CRUD Operations
- JSON Server
- AJAX using jQuery
- Git & GitHub Workflow

---

## Future Improvements

- Sorting Employees
- Pagination
- Advanced Filters
- Login Authentication
- Local Storage Support
- Responsive Mobile Layout
- Toast Notifications
- Dark Mode

---

## Author

Sandesh Raj

GitHub:
https://github.com/Sandeshdharma

---

## License

This project is developed for learning purposes as part of BridgeLabz and Apexon Frontend Training.
