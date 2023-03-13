export class TaskList {
  constructor(l) {
    this.listTasks = l;
  }

  set listEmployees(l) {
    this._listTasks = l;
  }

  get listEmployees() {
    return this._listTasks;
  }

  templateLITask = (data) => {
    let fullData = data;
    let doc = fullData.data();
    let li = `
              <li id="${fullData.id}">
                  <span class="nameTask">${doc.name}</span><br>
                  <span class="descriptionTask">Created: </span>
                  <span class="createdAt">${doc.createdAt}</span><br>
                  <span class="descriptionTask">Due date: </span>
                  <span class="dueDate">${doc.dueDate} </span><br>
                  <span class="descriptionTask">Assignee: </span>
                  <span class="assignee">${doc.assignee}</span><br>
                  <span class="descriptionTask"> Description:</span>
                  <span class="description">${doc.description}</span><br>
                  <button class="updateTask">Update</button><br>
                  <button class="deleteTask">Delete</button><br> 
                  <button class="closeTask">Close Task</button><br>         
              </li>
              `;
    this.listTasks.innerHTML += li;
  };
  templateLITaskDone = (data) => {
    let fullData = data;
    let doc = fullData.data();
    let li = `
              <li style='color:grey' id="${fullData.id}">
                  <span class="nameTask">${doc.name}</span><br>
                  <span class="descriptionTask">Created: </span>
                  <span class="createdAt">${doc.createdAt}</span><br>
                  <span class="descriptionTask">Due date: </span>
                  <span class="dueDate">${doc.dueDate} </span><br>
                  <span class="descriptionTask">Assignee: </span>
                  <span class="assignee">${doc.assignee}</span><br>
                  <span class="descriptionTask"> Description:</span>
                  <span class="description">${doc.description}</span><br>
                  <button disabled class="updateTask">Update</button><br>
                  <button disabled class="deleteTask">Delete</button><br> 
                  <button disabled class="closeTask">Close Task</button><br>         
              </li>
              `;
    this.listTasks.innerHTML += li;
  };

  clearUl() {
    this.listTasks.innerHTML = "";
  }
}
