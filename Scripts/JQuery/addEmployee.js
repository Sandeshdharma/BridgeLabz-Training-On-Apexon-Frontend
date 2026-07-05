// GET EMPLOYEE ID FROM URL
const params = new URLSearchParams(window.location.search);
const employeeId = params.get("id");

// Event handling using jQuery
$("#employeeForm").on("submit", saveEmployee);

// FILL DAY MONTH YEAR DROPDOWNS
const daySelect = $("#day");
const monthSelect = $("#month");
const yearSelect = $("#year");

// Days
for (let i = 1; i <= 31; i++) {
  daySelect.append(
    `<option value="${String(i).padStart(2, "0")}">${i}</option>`,
  );
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
  monthSelect.append(`<option value="${m}">${index + 1}</option>`);
});

// Years
const currentYear = new Date().getFullYear();
for (let i = currentYear; i >= 2000; i--) {
  yearSelect.append(`<option value="${i}">${i}</option>`);
}

// LOAD EMPLOYEE FOR EDIT
async function loadEmployeeForEdit() {
  if (!employeeId) return;

  // Form Reset using jQuery
  $("#employeeForm")[0].reset();

  const employee = await getEmployeeById(employeeId);

  // Name
  $("#name").val(employee.name);

  // Gender
  $(`input[name="gender"][value="${employee.gender}"]`).prop("checked", true);

  // Profile Pic
  $(`input[name="profile"][value="${employee.profilePic}"]`).prop(
    "checked",
    true,
  );

  // Department Checkboxes
  employee.department.forEach((dep) => {
    $(`input[type="checkbox"][value="${dep}"]`).prop("checked", true);
  });

  // Salary
  $("#salary").val(employee.salary);

  // Date Split & Allocation
  const [yyyy, mm, dd] = employee.startDate.split("-");
  $("#day").val(dd);
  $("#month").val(mm);
  $("#year").val(yyyy);

  // Notes
  $("#notes").val(employee.notes);

  // Heading and Button Text
  $("#formTitle").text("Update Employee");
  $("#submitBtn").text("Update");
}

// VALIDATION
function showError(selector, message) {
  $(selector + "-error")
    .text(message)
    .show();
}

function clearErrors() {
  $(".error-text").text("").hide();
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const name = $("#name").val().trim();
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

  const profile = $('input[name="profile"]:checked');
  if (profile.length === 0) {
    showError("#profile", "Please select Profile Image.");
    isValid = false;
  }

  const gender = $('input[name="gender"]:checked');
  if (gender.length === 0) {
    showError("#gender", "Please select Gender.");
    isValid = false;
  }

  const departments = $('input[type="checkbox"]:checked');
  if (departments.length === 0) {
    showError("#department", "Please select at least one Department.");
    isValid = false;
  }

  if ($("#salary").val() === "") {
    showError("#salary", "Please select Salary.");
    isValid = false;
  }

  if (
    $("#day").val() === "" ||
    $("#month").val() === "" ||
    $("#year").val() === ""
  ) {
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

  const employee = {
    profilePic: $('input[name="profile"]:checked').val(),
    name: $("#name").val().trim(),
    gender: $('input[name="gender"]:checked').val(),
    department: $('input[type="checkbox"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get(),
    salary: $("#salary").val(),
    startDate:
      $("#year").val() + "-" + $("#month").val() + "-" + $("#day").val(),
    notes: $("#notes").val().trim(),
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
$("#cancelBtn").on("click", function () {
  window.location.href = "../index.html";
});

// RESET BUTTON
$("#resetBtn").on("click", function () {
  clearErrors();
});

// Initialize form check on load
loadEmployeeForEdit();
