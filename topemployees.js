const employeesCollections = db.collection("employees");

function getEmployeesWithMostTasks(numEmployees) {
  return employeesCollections.get()
    .then((querySnapshot) => {
      const employeeTasks = {};
      querySnapshot.forEach((doc) => {
        const employeeData = doc.data();
        const employeeFullName = employeeData.fullName;
        const employeeTasksArr = employeeData.finishedTasks || [];
        employeeTasks[employeeFullName] = employeeTasksArr.length;
      });
      const sortedEmployeeTasks = Object.entries(employeeTasks)
        .sort(([, tasksA], [, tasksB]) => tasksB - tasksA)
        .slice(0, numEmployees);
      const topEmployees = sortedEmployeeTasks.map(([fullName, numTasks]) => `${fullName} (${numTasks} tasks)`);
      return topEmployees;
    })
    .catch((error) => {
      console.error("Error getting employees with most tasks:", error);
      return [];
    });
}

const numEmployees = 5;
getEmployeesWithMostTasks(numEmployees)
  .then((topEmployees) => {
    const employeeList = document.getElementById("top-emp");
    topEmployees.forEach((employeeFullName) => {
      const li = document.createElement("li");
      li.innerText = employeeFullName;
      employeeList.appendChild(li);
    });
  });
