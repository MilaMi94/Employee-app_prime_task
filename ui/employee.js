export class Employee {
  constructor(n, e, p, dB, s, t) {
    this.fullName = n;
    this.email = e;
    this.phoneNumber = p;
    this.dateOfBirth = dB;
    this.monthSalary = s;
    this.team = t;
    this.tasks = [];
    this.finishedTasks = [];
  }

  //setters
  set name(n) {
    this._name = n;
  }
  set email(e) {
    this._email = e;
  }
  set phoneNumber(p) {
    this._phoneNumber = p;
  }
  set dateOfBirth(dB) {
    this._dateOfBirth = dB;
  }
  set monthSalary(s) {
    this._monthSalary = s;
  }
  set team(t) {
    this._team = t;
  }

  //getters

  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  get dateOfBirth() {
    return this._dateOfBirth;
  }
  get monthSalary() {
    return this._monthSalary;
  }
  get team() {
    return this._team;
  }

  //methods
  getEmployees = (callback) => {
    db.collection("employees").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          callback(change.doc);
        }
      });
    });
  };

  async addEmployee() {
    const employeeData = {
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      monthSalary: this.monthSalary,
      team: this.team,
      tasks: this.tasks,
      finishedTasks: this.finishedTasks,
    };
    let response = await db.collection("employees").add(employeeData);
    return response;
  }

  async deleteEmployee(id)
 {
    return await db.collection("employees").doc(id).delete();
  }

  async updateEmployee(id)
 {
    const newData = {
      fullName: this.fullName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.dateOfBirth,
      monthSalary: this.monthSalary,
      team: this.team,
      tasks: this.tasks,
      finishedTasks: this.finishedTasks,
    };

    return (
      await db.collection("employees").doc(id).update(newData), { merge: true }
    );
  }
}