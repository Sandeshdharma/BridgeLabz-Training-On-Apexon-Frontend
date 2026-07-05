// TABLE

const table = document.getElementById("employeeTable");

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

  const parts = dateStr.split("-");

  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;

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

  return dateStr;
}

// RENDER EMPLOYEES

function renderEmployees(employees) {
  table.innerHTML = "";

  if (employees.length === 0) {
    table.innerHTML = `
            <tr>
                <td colspan="6" class="no-record">
                    No record found for employee
                </td>
            </tr>
        `;

    return;
  }

  employees.forEach((emp) => {
    const profilePicPath = emp.profilePic ? emp.profilePic.replace(/^\.\.\//, "") : "";
    table.innerHTML += `

        <tr>

            <td class="employee-name">

                <img
                    src="${profilePicPath}"
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

        `;
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
  window.location.href = `Templates/addEmployee.html?id=${id}`;
}

// ADD USER BUTTON

const addUserBtn = document.getElementById("addUserBtn");

addUserBtn.addEventListener("click", function () {
  window.location.href = "Templates/addEmployee.html";
});

// SEARCH

const searchInput = document.getElementById("searchEmployee");

searchInput.addEventListener("input", searchEmployee);

function searchEmployee(event) {
  const keyword = event.target.value.toLowerCase();

  const filteredEmployees = employeeList.filter((emp) =>
    emp.name.toLowerCase().includes(keyword),
  );

  renderEmployees(filteredEmployees);
}

// SEARCH BUTTON

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  searchInput.classList.toggle("active");

  searchInput.focus();
});

// PAGE LOAD

window.addEventListener("DOMContentLoaded", function () {
  loadEmployees();
});
