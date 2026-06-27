
// GET EMPLOYEE ID FROM URL


const params = new URLSearchParams(window.location.search);

const employeeId = params.get("id");

const form = document.getElementById("employeeForm");

// form.addEventListener("submit", saveEmployee);

//Jquery
$("#employeeForm").on("submit", saveEmployee);



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

    
    // JavaScript Version
    // form.reset();

    // jQuery 
    $("#employeeForm")[0].reset();

    // -----------------------------

    const employee = await getEmployeeById(employeeId);

    // JavaScript 

    // document.getElementById("name").value = employee.name;

    // jQuery 

    $("#name").val(employee.name);

   
    // JavaScript Version

    /*
    document.querySelector(
        `input[name="gender"][value="${employee.gender}"]`
    ).checked = true;
    */

    // jQuery Version

    $(`input[name="gender"][value="${employee.gender}"]`)
        .prop("checked", true);


    // JavaScript Version

    /*
    document.querySelector(
        `input[name="profile"][value="${employee.profilePic}"]`
    ).checked = true;
    */

    // jQuery 

    $(`input[name="profile"][value="${employee.profilePic}"]`)
        .prop("checked", true);

   
    // Department

    employee.department.forEach((dep) => {

        // JavaScript 

        /*
        document.querySelector(
            `input[type="checkbox"][value="${dep}"]`
        ).checked = true;
        */

        // jQuery 

        $(`input[type="checkbox"][value="${dep}"]`)
            .prop("checked", true);

    });

  
    // Salary

    // JavaScript 

    // document.getElementById("salary").value = employee.salary;

    // jQuery 

    $("#salary").val(employee.salary);

 
    // Date

    const [yyyy, mm, dd] = employee.startDate.split("-");

    // JavaScript 

    /*
    day.value = dd;
    month.value = mm;
    year.value = yyyy;
    */

    // jQuery 

    $("#day").val(dd);

    $("#month").val(mm);

    $("#year").val(yyyy);

    // Notes

    // JavaScript Version

    // document.getElementById("notes").value = employee.notes;

    // jQuery Version

    $("#notes").val(employee.notes);

   
    // Heading

    // JavaScript 

    // document.getElementById("formTitle").textContent = "Update Employee";

    // jQuery 

    $("#formTitle").text("Update Employee");

  
    // Button Text

    // JavaScript 

    // document.getElementById("submitBtn").textContent = "Update";

    // jQuery

    $("#submitBtn").text("Update");
}

// VALIDATION





function validateForm() {

  
    

    // const name = document.getElementById("name").value.trim();

    // jQuery 

    const name = $("#name").val().trim();

    const nameRegex = /^[A-Za-z ]{3,40}$/;

    if (name === "") {

        alert("Name is required.");

        return false;
    }

    if (!nameRegex.test(name)) {

        alert("Name should contain only alphabets and minimum 3 characters.");

        return false;
    }

    // Profile

    // JavaScript

    // const profile = document.querySelector('input[name="profile"]:checked');

    // jQuery 

    const profile = $('input[name="profile"]:checked');

    if (profile.length === 0) {

        alert("Please select Profile Image.");

        return false;
    }

  
    // Gender

    // JavaScript 

    // const gender = document.querySelector('input[name="gender"]:checked');

    // jQuery 

    const gender = $('input[name="gender"]:checked');

    if (gender.length === 0) {

        alert("Please select Gender.");

        return false;
    }

 
    // Department

    // JavaScript 

    /*
    const departments =
    document.querySelectorAll('input[type="checkbox"]:checked');
    */

    // jQuery Version

    const departments = $('input[type="checkbox"]:checked');

    if (departments.length === 0) {

        alert("Please select at least one Department.");

        return false;
    }


    // Salary

    // JavaScript 

    // if(document.getElementById("salary").value === "")

    // jQuery 

    if ($("#salary").val() === "") {

        alert("Please select Salary.");

        return false;
    }

   
    // Date

    // JavaScript 

    /*
    if(day.value === "" ||
       month.value === "" ||
       year.value === "")
    */

    // jQuery 

    if ($("#day").val() === "" ||
        $("#month").val() === "" ||
        $("#year").val() === "") {

        alert("Please select Start Date.");

        return false;
    }

    return true;

}


// SAVE EMPLOYEE


async function saveEmployee(event) {

    event.preventDefault();

    if (!validateForm()) {
        return;
    }

   

    /*
    const employee = {

        profilePic: document.querySelector(
            'input[name="profile"]:checked'
        ).value,

        name: document.getElementById("name").value.trim(),

        gender: document.querySelector(
            'input[name="gender"]:checked'
        ).value,

        department: [
            ...document.querySelectorAll(
                'input[type="checkbox"]:checked'
            )
        ].map(dep => dep.value),

        salary: document.getElementById("salary").value,

        startDate:
            year.value + "-" +
            month.value + "-" +
            day.value,

        notes: document.getElementById("notes").value.trim()

    };
    */

    // jQuery 

    const employee = {

        profilePic: $('input[name="profile"]:checked').val(),

        name: $("#name").val().trim(),

        gender: $('input[name="gender"]:checked').val(),

        department: $('input[type="checkbox"]:checked').map(function () {

                return $(this).val();

            }).get(),

        salary: $("#salary").val(),

        startDate:

            $("#year").val() + "-" +
            $("#month").val() + "-" +
            $("#day").val(),

        notes: $("#notes").val().trim()

    };

 
    // Fetch Employees

    const employees = await getEmployees();

    
    // Duplicate Check

    const duplicate = employees.find(emp => {

        if (employeeId) {

            return emp.id != employeeId &&
                   emp.name.toLowerCase() === employee.name.toLowerCase();

        }

        return emp.name.toLowerCase() === employee.name.toLowerCase();

    });

    if (duplicate) {

        alert("Employee already exists.");

        return;

    }

  
    // Update Employee

    if (employeeId) {

        await updateEmployee(employeeId, employee);

        // alert("Employee Updated Successfully.");

        window.location.href = "./dashboard.html";

        return;

    }

  
    // Add Employee

    await addEmployee(employee);

  // /  alert("Employee Added Successfully.");

    window.location.href = "./dashboard.html";

}


// CANCEL BUTTON


// const cancelBtn = document.getElementById("cancelBtn");

// if (cancelBtn) {
//   cancelBtn.addEventListener("click", () => {
//     window.location.href = "./dashboard.html";
//   });
// }
$("#cancelBtn").on("click", function(){
  window.location.href="./dashboard.html"
});




loadEmployeeForEdit();
