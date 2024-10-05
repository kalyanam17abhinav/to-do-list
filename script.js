let task = document.getElementById("inputText");

function createDelete(newli, taskValue) {
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    newli.appendChild(deleteButton);
    deleteButton.style.float = "left";
    deleteButton.style.margin = "10px 0px 5px 10px";

    deleteButton.addEventListener('click', () => deleteTask(newli, taskValue));
}

function createFinished(newli, taskValue) {
    let finishedButton = document.createElement("button");
    finishedButton.innerHTML = "finished";
    newli.appendChild(finishedButton);
    finishedButton.style.float = "right";
    finishedButton.style.margin = "10px 10px 5px 0px";

    finishedButton.addEventListener('click', () => finishTask(newli, taskValue));
}

function addTask() {
    let newli = document.createElement("li");
    let taskValue = task.value;

    if (taskValue.trim() === "") return;

    newli.innerHTML = taskValue;
    document.getElementById("taskListul").appendChild(newli);
    newli.style.fontWeight = "bolder";
    newli.style.fontSize = "25px";
    newli.style.wordWrap = "break-word";

    createDelete(newli, taskValue);
    createFinished(newli, taskValue);


    let taskRetrieve = JSON.parse(localStorage.getItem('taskRetrieve')) || [];
    taskRetrieve.push({ value: taskValue, isFinished: false });
    localStorage.setItem('taskRetrieve', JSON.stringify(taskRetrieve));

    task.value = "";
}

function deleteTask(newli, taskValue) {
    newli.remove();

    let taskRetrieve = JSON.parse(localStorage.getItem('taskRetrieve')) || [];
    taskRetrieve = taskRetrieve.filter(task => task.value !== taskValue);
    localStorage.setItem('taskRetrieve', JSON.stringify(taskRetrieve));
}

function finishTask(newli, taskValue) {
    newli.style.backgroundColor = "#F4A261";
    newli.style.color = "black";

    let taskRetrieve = JSON.parse(localStorage.getItem('taskRetrieve')) || [];
    let taskToFinish = taskRetrieve.find(task => task.value === taskValue);
    if (taskToFinish) {
        taskToFinish.isFinished = true;
    }
    localStorage.setItem('taskRetrieve', JSON.stringify(taskRetrieve));

}

let buttonTask = document.querySelector('#add');
buttonTask.addEventListener('click', addTask);

function displayTasks() {
    let taskRetrieve = JSON.parse(localStorage.getItem('taskRetrieve')) || [];
    taskRetrieve.forEach(function (taskObj) {
        let newli = document.createElement("li");
        newli.innerHTML = taskObj.value;
        document.getElementById("taskListul").appendChild(newli);
        newli.style.fontWeight = "bolder";
        newli.style.fontSize = "25px";
        newli.style.wordWrap = "break-word";

        if (taskObj.isFinished) {
            newli.style.backgroundColor = "#f4a261";
            newli.style.color = "black";
        }

        createDelete(newli, taskObj.value);
        createFinished(newli, taskObj.value);
    });
}

window.onload = displayTasks;