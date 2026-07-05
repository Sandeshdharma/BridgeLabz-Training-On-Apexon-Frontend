// TABLE

const table = $("#employeeTable");

// GLOBAL ARRAY

let employeeList = [];

// LOAD ALL EMPLOYEES

async function loadEmployees() {
  employeeList = await getEmployees();

  renderEmployees(employeeList);
}

// FORMAT DATE

function formatDate(dateStr) {
  if (!dateStr) return "";

  const [yyyy, mm, dd] = dateStr.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${parseInt(dd)} ${months[parseInt(mm) - 1]} ${yyyy}`;
}

// RENDER EMPLOYEES

function renderEmployees(employees) {
  table.html("");

  if (employees.length === 0) {
    table.append(`
            <tr>
                <td colspan="6" class="no-record">
                    No record found for employee
                </td>
            </tr>
        `);

    return;
  }

  employees.forEach(function (emp) {
    const profilePicPath = emp.profilePic ? emp.profilePic.replace(/^\.\.\//, "") : "";
    table.append(`

            <tr>

                <td class="employee-name">

                    <img
                        src="${profilePicPath}"
                        class="profile-img">

                    <span>${emp.name}</span>

                </td>

                <td>

                    ${emp.gender}

                </td>

                <td>

                    ${emp.department
                      .map(function (dep) {
                        return `
                                <span class="department-badge">
                                    ${dep}
                                </span>
                            `;
                      })
                      .join("")}

                </td>

                <td>

                    ₹ ${Number(emp.salary).toLocaleString('en-IN')}

                </td>

                <td>

                    ${formatDate(emp.startDate)}

                </td>

                <td>

                    <img
                        src="Assets/Images/trash.jpeg"
                        class="action-icon"
                        onclick="removeEmployee('${emp.id}')">

                    <img
                        src="Assets/Images/edit.jpeg"
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

// ==============================
// EDIT EMPLOYEE
// ==============================

function editEmployee(id) {
  window.location.href = `Templates/addEmployee.html?id=${id}`;
}

// ==============================
// SEARCH EMPLOYEE
// ==============================

function searchEmployee(event) {
  const keyword = $(event.target).val().toLowerCase();

  const filteredEmployees = employeeList.filter(function (emp) {
    return emp.name.toLowerCase().includes(keyword);
  });

  renderEmployees(filteredEmployees);
}

// JQUERY EVENTS

$(document).ready(function () {
  loadEmployees();

  // Add Employee Button

  $("#addUserBtn").on("click", function () {
    window.location.href = "Templates/addEmployee.html";
  });

  // Search Input

  $("#searchEmployee").on("input", searchEmployee);

  // Search Button

  $("#searchBtn").on("click", function () {
    $("#searchEmployee").toggleClass("active");

    $("#searchEmployee").focus();
  });
});
