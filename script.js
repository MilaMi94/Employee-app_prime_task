import { Employee } from "./ui/employee.js";
import { EmployeeList } from "./ui/employeeList.js";

const addEmployeeForm = document.getElementById("add-employee-form");
const fullName = document.getElementById("full-name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");
const dateOfBirth = document.getElementById("date-of-birth");
const monthlySalary = document.getElementById("monthly-salary");
const team = document.getElementById("team");
const ulEmployees = document.getElementById("employees");


const closeBtn = document.getElementById("close-form");
const updateWrapper = document.getElementById("employee-form-wrapper");

const overlay = document.getElementById('overlay');

//////////////////////////////////
const updateEmployeeForm = document.getElementById("update-employee-form");
const updateName = document.getElementById("update-name");
const updateEmail = document.getElementById("update-email");
const updatePhone = document.getElementById("update-phone-number");
const updateDateOfBirth = document.getElementById("update-date-of-birth");
const updateSalary = document.getElementById("update-monthly-salary");
const updateTeam = document.getElementById("update-team");

//instances
const employeesList = new EmployeeList(ulEmployees);
const employee = new Employee(
  fullName.value,
  email.value,
  phoneNumber.value,
  dateOfBirth.value,
  monthlySalary.value,
  team.value
);

//adding new employee
addEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const employee = new Employee(
    fullName.value,
    email.value,
    phoneNumber.value,
    dateOfBirth.value,
    monthlySalary.value,
    team.value
  );

  employee
    .addEmployee()
    .then((docId) => {
      console.log("Employee added with ID: ", docId);
    })
    .catch((error) => {
      console.error("Error adding employee: ", error);
    });

  addEmployeeForm.reset();
});

//get employees on page
employee.getEmployees((data) => {
  employeesList.templateLI(data);
});



closeBtn.addEventListener('click', () => {
  updateWrapper.classList.remove('show');
  

    overlay.classList.remove('show');
 
});

//update and delete employee btn
ulEmployees.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    let li = e.target.parentElement;
    let liId = li.id;
    if (e.target.className == "update") {
      if (confirm("Are you sure you want to update the employee?") === true) {
        updateWrapper.classList.add('show');
       
         overlay.classList.add('show');
        let fullName = li.querySelector(".fullName");
        let phoneNumber = li.querySelector(".phone");
        let dateOfBirth = li.querySelector(".birthDate");
        let monthlySalary = li.querySelector(".salary");
        let team = li.querySelector(".team");
        let email = li.querySelector(".email");
        updateEmployeeForm.classList.add(`${liId}`);
        updateName.value = fullName.textContent;
        updateEmail.value = email.textContent;
        updatePhone.value = phoneNumber.textContent;
        updateDateOfBirth.value = dateOfBirth.textContent;
        updateSalary.value = monthlySalary.textContent;
        updateTeam.value = team.textContent;
      }
    } else if (e.target.className == "delete") {
      if (confirm("Are you sure you want to delete the employee?") === true) {
        let btnDelete = e.target;
        let li = btnDelete.parentElement;
        employee.deleteEmployee(li.id);
        employeesList.clearUl();
        //get employees
        employee.getEmployees((data) => {
          employeesList.templateLI(data);
        });
      }
    }
  }
});

//form update employee

updateEmployeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let employee = new Employee(
    updateName.value,
    updateEmail.value,
    updatePhone.value,
    updateDateOfBirth.value,
    updateSalary.value,
    updateTeam.value,
    `${updateEmployeeForm.classList}`
  );
  employee
    .updateEmployee(`${updateEmployeeForm.classList}`)
    .then((docId) => {
      console.log("Employee added with ID: ", docId);
    })
    .catch((error) => {
      console.error("Error adding employee: ", error);
    });
  updateEmployeeForm.classList.remove(updateEmployeeForm.classList[0]);
  employeesList.clearUl();
  updateEmployeeForm.reset();
  //get employees
  employee
    .getEmployees((data) => {
      employeesList.templateLI(data);
    })
    .then((docId) => {
      console.log("Employee added with ID: ", docId);
    })
    .catch((error) => {
      console.error("Error adding employee: ", error);
    });
});