import { TaskList } from "./ui/taskList.js";
import { Task } from "./ui/task.js";

//get elements
const createdAt = document.getElementById("date-of-creation");
const description = document.getElementById("description");
const dueDate = document.getElementById("due-date");
const taskName = document.getElementById("task-name");
const assignee = document.getElementById("assignee");
const addTaskForm = document.getElementById("add-task-form");
const ulTasks = document.getElementById("tasks");
const updateTaskForm = document.getElementById("update-task-form");
const updateCreatedAt = document.getElementById("update-date-of-creation");
const updateDescription = document.getElementById("update-description");
const updateDueDate = document.getElementById("update-due-date");
const updateTaskName = document.getElementById("update-task-name");
const updateAssignee = document.getElementById("update-assignee");
const employeesCollection = db.collection("employees");
const tasksCollection = db.collection("tasks");
const closeBtn = document.getElementById("close-form");
const updateWrapper = document.getElementById("employee-form-wrapper");
const overlay = document.getElementById("overlay");

//instances
const taskList = new TaskList(ulTasks);
const task = new Task(
  taskName.value,
  createdAt.value,
  dueDate.value,
  assignee.value,
  description.value
);
//function for add or update Task if in database exist employee with that name
function addOrUpdateTask(action, task) {
  checkEmployeeExists(assignee.value || updateAssignee.value).then((exists) => {
    if (exists) {
      if (action === "add") {
        task
          .addTask()
          .then((docRef) => {
            console.log("Task added with ID: ", docRef.id);
            // Add task name to employee's tasks array
            employeesCollection
              .where("fullName", "==", task.assignee)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  addTaskToEmployee(doc.ref, task.name)
                    .then(() => {
                      console.log(
                        `Task added to employee ${task.assignee}'s tasks.`
                      );
                    })
                    .catch((error) => {
                      console.error("Error adding task to employee:", error);
                    });
                });
              })
              .catch((error) => {
                console.error("Error getting employee:", error);
              });
          })
          .catch((error) => {
            console.error("Error adding task: ", error);
          });
      } else if (action === "update") {
        task
          .updateTask(`${updateTaskForm.classList}`)
          .then(() => {
            taskList.clearUl();
            updateTaskForm.reset();
            //get tasks

            task.getTasks(
              (data) => {
                taskList.templateLITaskDone(data);
              },
              (data) => {
                taskList.templateLITask(data);
              }
            );
          })
          .catch((error) => {
            console.error("Error updating task: ", error);
          });
      } else {
        console.error("Invalid action parameter");
      }
    } else {
      alert("Employee does not exist.");
    }
  });
}
//check if employee exist in database
function checkEmployeeExists(assigneeFullName) {
  return employeesCollection
    .where("fullName", "==", assigneeFullName)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return false;
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.error("Error checking if employee exists:", error);
      return false;
    });
}
//add task to employee
function addTaskToEmployee(employeeDocRef, taskName) {
  return employeeDocRef.update({
    tasks: firebase.firestore.FieldValue.arrayUnion(taskName),
  });
}
//close task in database
function addCloseTask(employeeDocRef, taskName) {
  return employeeDocRef.update({
    finishedTasks: firebase.firestore.FieldValue.arrayUnion(taskName),
  });
}

//adding new task
addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = new Task(
    taskName.value,
    createdAt.value,
    dueDate.value,
    assignee.value,
    description.value
  );
  addOrUpdateTask("add", task);
});
addTaskForm.reset();
//get tasks on page
task.getTasks(
  (data) => {
    taskList.templateLITaskDone(data);
  },
  (data) => {
    taskList.templateLITask(data);
  }
);

//closeBtn
closeBtn.addEventListener("click", () => {
  updateWrapper.classList.remove("show");
  overlay.classList.remove("show");
});

//update, delete and close task btn
ulTasks.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    let li = e.target.parentElement;
    let liId = li.id;
    let nameTask = li.querySelector(".nameTask");
    let assignee = li.querySelector(".assignee");
    if (e.target.className == "updateTask") {
      if (confirm("Are you sure you want to update the task?") === true) {
        updateWrapper.classList.add("show");
        overlay.classList.add("show");
        let description = li.querySelector(".description");
        let createdAt = li.querySelector(".createdAt");
        let dueDate = li.querySelector(".dueDate");
        updateTaskForm.classList.add(`${liId}`);
        updateTaskName.value = nameTask.textContent;
        updateAssignee.value = assignee.textContent;
        updateDescription.value = description.textContent;
        updateCreatedAt.value = createdAt.textContent;
        updateDueDate.value = dueDate.textContent;
      }
    } else if (e.target.className == "deleteTask") {
      if (confirm("Are you sure you want to delete the task?") === true) {
        task.deleteTask(liId);
        //delete task in employee database
        employeesCollection
          .where("fullName", "==", assignee.textContent)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref
                .update({
                  tasks: firebase.firestore.FieldValue.arrayRemove(
                    nameTask.textContent
                  ),
                  finishedTasks: firebase.firestore.FieldValue.arrayRemove(
                    nameTask.textContent
                  ),
                })
                .then(() => {
                  console.log("Task removed successfully");
                })
                .catch((error) => {
                  console.error("Error removing task from employee:", error);
                });
            });
          })
          .catch((error) => {
            console.error("Error querying employees collection:", error);
          });
        //clear ul list
        taskList.clearUl();
        //get tasks
        task.getTasks(
          (data) => {
            taskList.templateLITaskDone(data);
          },
          (data) => {
            taskList.templateLITask(data);
          }
        );
      }
    } else if (e.target.className == "closeTask") {
      if (confirm("Are you sure you want to close the task?") === true) {
        li.style.color = "grey";
        let assignee = li.querySelector(".assignee");
        tasksCollection
          .doc(liId)
          .update({
            finished: true,
          })
          .catch((error) => {
            console.error("Error adding finished task to employee:", error);
          });
        employeesCollection
          .where("fullName", "==", assignee.textContent)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              addCloseTask(doc.ref, nameTask.textContent)
                .then(() => {
                  console.log(
                    `Finished task added to employee ${assignee.textContent}'s tasks.`
                  );
                })
                .catch((error) => {
                  console.error(
                    "Error adding finished task to employee:",
                    error
                  );
                });
            });
          });
      }
      e.target.disabled = true;
    }
  }
});

//form update task
updateTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = new Task(
    updateTaskName.value,
    updateCreatedAt.value,
    updateDueDate.value,
    updateAssignee.value,
    updateDescription.value
  );
  addOrUpdateTask("update", task);
});
