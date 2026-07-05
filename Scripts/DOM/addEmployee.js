// GET EMPLOYEE ID FROM URL
const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");

const form = document.getElementById("employeeForm");
form.addEventListener("submit", saveEmployee);

// FILL DAY MONTH YEAR DROPDOWNS
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

// Days
for (let i = 1; i <= 31; i++) {
  day.innerHTML += `<option value="${String(i).padStart(2, "0")}">${i}</option>`;
}

// Months
const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

months.forEach((m, index) => {
  month.innerHTML += `<option value="${m}">${index + 1}</option>`;
});

// Years
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 2000; i--) {
  year.innerHTML += `<option value="${i}">${i}</option>`;
}

// LOAD EMPLOYEE FOR EDIT
async function loadEmployeeForEdit() {
  if (!employeeId) return;

  // Reset Form
  form.reset();

  const employee = await getEmployeeById(employeeId);

  // Name
  document.getElementById("name").value = employee.name;

  // Gender
  const genderRadio = document.querySelector(
    `input[name="gender"][value="${employee.gender}"]`,
  );
  if (genderRadio) genderRadio.checked = true;

  // Profile Pic
  const profileRadio = document.querySelector(
    `input[name="profile"][value="${employee.profilePic}"]`,
  );
  if (profileRadio) profileRadio.checked = true;

  // Department Checkboxes
  employee.department.forEach((dep) => {
    const checkbox = document.querySelector(
      `input[type="checkbox"][value="${dep}"]`,
    );
    if (checkbox) checkbox.checked = true;
  });

  // Salary
  document.getElementById("salary").value = employee.salary;

  // Date
  const [yyyy, mm, dd] = employee.startDate.split("-");
  day.value = dd;
  month.value = mm;
  year.value = yyyy;

  // Notes
  document.getElementById("notes").value = employee.notes;

  // Heading and Button text
  document.getElementById("formTitle").textContent = "Update Employee";
  document.getElementById("submitBtn").textContent = "Update";
}

// VALIDATION
function showError(selector, message) {
  const errorElement = document.querySelector(selector + "-error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block"; // Replaces .show()
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-text");
  errorElements.forEach((el) => {
    el.textContent = "";
    el.style.display = "none"; // Replaces .hide()
  });
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const nameInput = document.getElementById("name");
  const name = nameInput ? nameInput.value.trim() : "";

  if (name === "") {
    showError("#name", "Name is required.");
    isValid = false;
  } else if (/\d/.test(name)) {
    showError("#name", "Number not allowed.");
    isValid = false;
  } else {
    const nameRegex = /^[A-Za-z ]{3,40}$/;
    if (!nameRegex.test(name)) {
      showError(
        "#name",
        "Name should contain only alphabets and minimum 3 characters.",
      );
      isValid = false;
    }
  }

  const profile = document.querySelector('input[name="profile"]:checked');
  if (!profile) {
    showError("#profile", "Please select Profile Image.");
    isValid = false;
  }

  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    showError("#gender", "Please select Gender.");
    isValid = false;
  }

  const departments = document.querySelectorAll(
    'input[type="checkbox"]:checked',
  );
  if (departments.length === 0) {
    showError("#department", "Please select at least one Department.");
    isValid = false;
  }

  if (document.getElementById("salary").value === "") {
    showError("#salary", "Please select Salary.");
    isValid = false;
  }

  if (day.value === "" || month.value === "" || year.value === "") {
    showError("#date", "Please select Start Date.");
    isValid = false;
  }

  return isValid;
}

// SAVE EMPLOYEE
async function saveEmployee(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Map over checked department checkboxes natively using Array.from()
  const checkedDepartments = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked'),
  ).map((cb) => cb.value);

  const employee = {
    profilePic: document.querySelector('input[name="profile"]:checked').value,
    name: document.getElementById("name").value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value,
    department: checkedDepartments,
    salary: document.getElementById("salary").value,
    startDate: `${year.value}-${month.value}-${day.value}`,
    notes: document.getElementById("notes").value.trim(),
  };

  // Fetch Employees
  const employees = await getEmployees();

  // Duplicate Check
  const duplicate = employees.find((emp) => {
    if (employeeId) {
      return (
        emp.id != employeeId &&
        emp.name.toLowerCase() === employee.name.toLowerCase()
      );
    }
    return emp.name.toLowerCase() === employee.name.toLowerCase();
  });

  if (duplicate) {
    showError("#name", "Employee already exists.");
    return;
  }

  // Update Employee
  if (employeeId) {
    await updateEmployee(employeeId, employee);
    window.location.href = "../index.html";
    return;
  }

  // Add Employee
  await addEmployee(employee);
  window.location.href = "../index.html";
}

// CANCEL BUTTON
document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "../index.html";
});

// RESET BUTTON
document.getElementById("resetBtn").addEventListener("click", function () {
  clearErrors();
});

// Initialize form check on load
loadEmployeeForEdit();
