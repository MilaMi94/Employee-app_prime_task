export class Task {
    constructor(n, c,due, a, d) {
      this.name = n;
      this.createdAt = c;
      this.dueDate = due;
      this.assignee = a;
      this.description = d;
      this.finished = false;
    }
  
    // setters
    set assignee(a) {
      this._assignee = a;
    }
  
    set name(n) {
      this._name = n;
    }
  
    set description(d) {
      this._description = d;
    }
  
    set createdAt(c) {
      this._createdAt = c;
    }
  
    set dueDate(d) {
      this._dueDate = d;
    }
  
    // getters
    get assignee() {
      return this._assignee;
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get createdAt() {
      return this._createdAt;
    }
  
    get dueDate() {
      return this._dueDate;
    }
  
    //methods
    getTasks = (callback1, callback2) => {
      db.collection("tasks").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const task = change.doc.data();
          if (change.type == "added") {
            if (task.finished) {
              callback1(change.doc);
            } else {
              callback2(change.doc);
            }
          }
        });
      });
    };
  
    async addTask() {
      const taskData = {
        name: this.name,
        createdAt: this.createdAt,
        dueDate: this.dueDate,
        assignee: this.assignee,
        description: this.description,
        finished: this.finished,
      };
  
      return await db.collection("tasks").add(taskData);
    }
  
    async deleteTask(id)
   {
      return await db.collection("tasks").doc(id).delete();
    }
  
    async updateTask(id)
   {
      const newData = {
        name: this.name,
        createdAt: this.createdAt,
        dueDate: this.dueDate,
        assignee: this.assignee, 
        description: this.description,
        finished: this.finished,
      };
  
      return (
        await db.collection("tasks").doc(id).update(newData), { merge: true }
      );
    }
  }