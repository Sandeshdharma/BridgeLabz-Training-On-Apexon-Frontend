
// TABLE


// JavaScript

// const table = document.getElementById("employeeTable");

// jQuery

const table = $("#employeeTable");


// GLOBAL ARRAY


let employeeList = [];


// LOAD ALL EMPLOYEES


async function loadEmployees() {
  employeeList = await getEmployees();

  renderEmployees(employeeList);
}


// RENDER EMPLOYEES


function renderEmployees(employees) {
  // JavaScript

  // table.innerHTML = "";

  // jQuery

  table.html("");

  employees.forEach((emp) => {
    // JavaScript

    /*
        table.innerHTML += `
        ....
        `;
        */

    // jQuery

    table.append(`

        <tr>

            <td class="employee-name">

                <img
                    src="${emp.profilePic}"
                    class="profile-img">

                <span>

                    ${emp.name}

                </span>

            </td>

            <td>

                ${emp.gender}

            </td>

            <td>

                ${emp.department
                  .map(
                    (dep) => `
                        <span class="department-badge">

                            ${dep}

                        </span>
                    `,
                  )
                  .join("")}

            </td>

            <td>

                ₹${emp.salary}

            </td>

            <td>

                ${emp.startDate}

            </td>

            <td>

                <img
                    src="../Assets/Images/trash.jpeg"
                    class="action-icon"
                    onclick="removeEmployee('${emp.id}')">

                <img
                    src="../Assets/Images/edit.jpeg"
                    class="action-icon"
                    onclick="editEmployee('${emp.id}')">

            </td>

        </tr>

        `);
  });
}


// DELETE EMPLOYEE


async function removeEmployee(id) {
  const confirmDelete = confirm("Are you sure?");

  if (!confirmDelete) {
    return;
  }

  await deleteEmployee(id);

  loadEmployees();
}


// EDIT EMPLOYEE


function editEmployee(id) {
  window.location.href = `addEmployee.html?id=${id}`;
}


// ADD USER BUTTON


// JavaScript

/*

document.getElementById("addUserBtn")
.addEventListener("click", () => {

    window.location.href = "addEmployee.html";

});

*/

// jQuery

$("#addUserBtn").click(function () {
  window.location.href = "addEmployee.html";
});


// SEARCH INPUT EVENT


// JavaScript

/*

document
.getElementById("searchEmployee")
.addEventListener("input", searchEmployee);

*/

// jQuery

$("#searchEmployee").on("input", searchEmployee);


// SEARCH FUNCTION


function searchEmployee(event) {
  // JavaScript

  /*
    const keyword =
    event.target.value.toLowerCase();
    */

  // jQuery

  const keyword = $(event.target).val().toLowerCase();

  const filteredEmployees = employeeList.filter((emp) =>
    emp.name.toLowerCase().includes(keyword),
  );

  renderEmployees(filteredEmployees);
}


// SEARCH BUTTON


// JavaScript

/*

const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchEmployee");

searchBtn.addEventListener("click", () => {

    searchInput.classList.toggle("active");

    searchInput.focus();

});

*/

// jQuery

$("#searchBtn").click(function () {
  $("#searchEmployee").toggleClass("active");

  $("#searchEmployee").focus();
});


// DOCUMENT READY


// JavaScript

/*

loadEmployees();

*/

// jQuery

$(document).ready(function () {
  loadEmployees();
});
