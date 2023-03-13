window.onload = function () {
  var collectionRef = firebase.firestore().collection("employees");

  collectionRef.get().then(function (querySnapshot) {
    var employeeCounts = {};
    var taskCounts = {};
    querySnapshot.forEach(function (doc) {
     
      var team = doc.data().team;

      if (!employeeCounts[team]) {
        employeeCounts[team] = 1;
      } else {
        employeeCounts[team]++;
      }
      if (!taskCounts[team]) {
        taskCounts[team] = 0;
      }

      var numTasks = doc.data().tasks.length;
      taskCounts[team] += numTasks;
    });

    var employeeCountsArray = [];
    for (var team in employeeCounts) {
      var count = employeeCounts[team];
      employeeCountsArray.push({
        team: team,
        count: count,
      });
    }

    var taskCountsArray = [];
    for (var team in taskCounts) {
      var count = taskCounts[team];
      taskCountsArray.push({
        team: team,
        taskCount: count,
      });
    }

    createPieChart(employeeCountsArray);
    createTasksChart(taskCountsArray);
    console.log(taskCountsArray);
  });

  function createTasksChart(teamCounts) {
    var labels = teamCounts.map(function (teamCount) {
      return teamCount.team;
    });
    var data = teamCounts.map(function (teamCount) {
      return teamCount.taskCount;
    });

    var canvas = document.getElementById("task-pie-chart");

    // Create a new pie chart using Chart.js
    var chart = new Chart(canvas, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#B90000",
              "#008B8B",
              "#00BFFF",
            ],
          },
        ],
      },
    });
    for (let i = 0; i < teamCounts.length; i++) {
      const team = teamCounts[i];
      const secondChart = document.getElementById("task-chart");
      const teamItem = document.createElement("div");
      const teamName = document.createElement("span");
      teamName.textContent = "Team: " + team.team;

      const teamCount = document.createElement("span");
      teamCount.textContent = " Count: " + team.taskCount;

      teamItem.appendChild(teamName);
      teamItem.appendChild(teamCount);
      secondChart.appendChild(teamItem);
    }
  }

  function createPieChart(teamCounts) {
    var labels = teamCounts.map(function (teamCount) {
      return teamCount.team;
    });
    var data = teamCounts.map(function (teamCount) {
      return teamCount.count;
    });

    var canvas = document.getElementById("myChart");

    // Create a new pie chart using Chart.js
    var myChart = new Chart(canvas, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
              "#B90000",
              "#008B8B",
              "#00BFFF",
            ],
          },
        ],
      },
    });

    for (let i = 0; i < teamCounts.length; i++) {
      const team = teamCounts[i];
      const firstChart = document.getElementById("employee-chart");

      const teamItem = document.createElement("div");
      const teamName = document.createElement("span");
      teamName.textContent = "Team: " + team.team;

      const teamCount = document.createElement("span");
      teamCount.textContent = " Count: " + team.count;

      teamItem.appendChild(teamName);
      teamItem.appendChild(teamCount);
      firstChart.appendChild(teamItem);
    }
  }
};
