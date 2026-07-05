const BASE_URL = "http://localhost:3000/employees";

// GET ALL EMPLOYEES
function getEmployees() {
  return $.ajax({
    url: BASE_URL,
    method: "GET",
  });
}

// ADD EMPLOYEE
function addEmployee(employee) {
  return $.ajax({
    url: BASE_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(employee),
  });
}

// DELETE EMPLOYEE
function deleteEmployee(id) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
}

// UPDATE EMPLOYEE
function updateEmployee(id, employee) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(employee),
  });
}

// GET EMPLOYEE BY ID
function getEmployeeById(id) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  });
}
