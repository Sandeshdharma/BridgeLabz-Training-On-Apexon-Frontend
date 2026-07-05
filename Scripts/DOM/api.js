const BASE_URL = "http://localhost:3000/employees";

// GET ALL EMPLOYEES
async function getEmployees() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

// ADD EMPLOYEE
async function addEmployee(employee) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return await response.json();
}

// DELETE EMPLOYEE
async function deleteEmployee(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return response.ok; // Returns true if the deletion was successful
}

// UPDATE EMPLOYEE
async function updateEmployee(id, employee) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return await response.json();
}

// GET EMPLOYEE BY ID
async function getEmployeeById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return await response.json();
}
