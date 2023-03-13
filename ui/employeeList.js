export class EmployeeList {
    constructor(l) {
      this.listEmployees = l;
    }
  
    set listEmployees(l) {
      this._listEmployees = l;
    }
  
    get listEmployees() {
      return this._listEmployees;
    }
  
    templateLI = (data) => {
      let fullData = data;
      let doc = fullData.data();
      let li = `
          <li id="${fullData.id}">
              <span class="fullName">${doc.fullName}</span><br>
              <span class="employeeDetails">Date of birth:</span>
              <span class="birthDate">${doc.dateOfBirth}</span><br>
              <span class="employeeDetails">Email:</span>
              <span class="email">${doc.email} </span><br>
              <span class="employeeDetails">Phone:</span>
              <span class="phone">${doc.phoneNumber}</span><br>
              <span class="employeeDetails">Salary:</span>
              <span class="salary">${doc.monthSalary}</span><br>
              <span class="employeeDetails">Team:</span>

              <span class="team">${doc.team}</span><br>
              <button class="update">Update</button><br>
              <button class="delete">Delete</button><br>         
          </li>
          `;
      this.listEmployees.innerHTML += li;
    };
    clearUl() {
      this.listEmployees.innerHTML = "";
    }
  }