const BASE_URL = "http://localhost:3000/employees";

// GET ALL EMPLOYEES

// async function getEmployees() {
//   const response = await fetch(BASE_URL);
//   return await response.json();
// }

//AJAX JQUERY

function getEmployees() {
  return $.ajax({
    url: BASE_URL,

    method: "GET",
  });
}

// ADD EMPLOYEE

// async function addEmployee(employee) {
//   const response = await fetch(BASE_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(employee),
//   });

//   return await response.json();
// }

function addEmployee(employee) {
  return $.ajax({
    url: BASE_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(employee),
  });
}

// DELETE EMPLOYEE

// async function deleteEmployee(id) {
//   await fetch(`${BASE_URL}/${id}`, {
//     method: "DELETE",
//   });
// }

function deleteEmployee(id) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
}

// UPDATE EMPLOYEE

// async function updateEmployee(id, employee) {
//   const response = await fetch(`${BASE_URL}/${id}`, {
//     method: "PUT",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify(employee),
//   });

//   return await response.json();
// }

function updateEmployee(id, employee) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,

    method: "PUT",

    contentType: "application/json",

    data: JSON.stringify(employee),
  });
}

// GET EMPLOYEE BY ID

// async function getEmployeeById(id) {
//   const response = await fetch(`${BASE_URL}/${id}`);

//   return await response.json();
// }

function getEmployeeById(id) {
  return $.ajax({
    url: `${BASE_URL}/${id}`,

    method: "GET",
  });
}