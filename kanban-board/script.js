const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")

const todoCount = document.querySelector("#todo-count")
const progressCount = document.querySelector("#progress-count")
const doneCount = document.querySelector("#done-count")

// add new task
const AddTaskBtn = document.querySelector(".add-btn")
const NewTaskContainer = document.querySelector(".new-task-container")

const AddTaskTitle = document.querySelector("#add-Title")
const AddTaskDescription = document.querySelector("#add-Desc")
const AddTaskSubmit = document.querySelector(".new-task-form")


const sampleData = {
    todo: [
        {
            title: "Setup backend API",
            description: "Initialize project structure and create basic routes"
        },
        {
            title: "Design database schema",
            description: "Plan collections/tables for users, tasks, and logs"
        }
    ],

    progress: [
        {
            title: "Build authentication system",
            description: "Create login, register and JWT helpers"
        }
    ],

    done: [
        {
            title: "Create UI layout",
            description: "Build responsive 3-column dashboard"
        },
        {
            title: "Setup project structure",
            description: "Organize MVC folders for controllers, routes, utils"
        }
    ]
};


// it fetch data from local storage if not it set
let CheckData = JSON.parse(localStorage.getItem('kandan-tasks'))

if (!CheckData) localStorage.setItem("kandan-tasks", JSON.stringify(sampleData));

TasksData = JSON.parse(localStorage.getItem('kandan-tasks'))


// it show num of task in each column for first time
todoCount.innerHTML = TasksData["todo"].length;
progressCount.innerHTML = TasksData["progress"].length;
doneCount.innerHTML = TasksData["done"].length;


// it take column name and task from foreach loop and added into dom that show task
function AddTaskIntoDOM(column, task) {
    const taskDiv = document.createElement('div')
    taskDiv.className = "task cursor-grab"
    taskDiv.setAttribute("draggable", "true")

    taskDiv.innerHTML = `
        <div class="task-text">
            <h2>${task.title}</h2>
            <p>${task.description}</p>
        </div>

        <div class="task-delete-btn">
            <button class="del-btn cursor">Delete</button>
        </div>
    `;

    column.appendChild(taskDiv)
}

// It render todo from data list
// it load task div into columns
TasksData.todo.forEach((task) => {
    AddTaskIntoDOM(todo, task)
})

TasksData.progress.forEach((task) => {
    AddTaskIntoDOM(progress, task)
})

TasksData.done.forEach((task) => {
    AddTaskIntoDOM(done, task)
})


// all tasks and buttons from dom
let tasks = document.querySelectorAll(".task")
let buttons = document.querySelectorAll(".del-btn")

let currentColumn, draggedItem = null;


function DragAndDrop(column) {

    // it add border when task enter that column
    column.addEventListener("dragenter", () => {
        column.classList.add("tasks-cols-hover")
    })

    // it rem border when task leave that column
    column.addEventListener("dragleave", () => {
        column.classList.remove("tasks-cols-hover")
    })

    // it allows to browser 
    // it is dropping area by default browser not allowed to drop
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("dragstart", () => {
        currentColumn = column
    })

    // where task put it append that div into that col
    column.addEventListener("drop", () => {

        // it append html into dom
        column.appendChild(draggedItem);

        //  it add and remove dragged item into localstorage
        removeTodoInLocal(currentColumn)
        AddTodoInLocal(column)

        column.classList.remove("tasks-cols-hover")
    })
}


// localhost
// this fn add draggeditem into localhost
function AddTodoInLocal(column) {
    const name = draggedItem.querySelector(".task-text h2").innerHTML
    const description = draggedItem.querySelector(".task-text p").innerHTML
    const col = column.id

    const obj = {
        title: `${name}`,
        description: `${description}`
    }

    TasksData[col].push(obj)

    updateDataAndCount()
}


// this fn remove todo into localhost which is dragged to another
function removeTodoInLocal(column) {
    const title = draggedItem.querySelector(".task-text h2").innerHTML
    const col = column.id

    TasksData[col] = TasksData[col].filter(item => item.title !== title)

    updateDataAndCount();
}


// utils
// that function used in set new task data to localstorage
function updateDataAndCount() {
    localStorage.setItem("kandan-tasks", JSON.stringify(TasksData))

    todoCount.innerHTML = TasksData["todo"].length;
    progressCount.innerHTML = TasksData["progress"].length;
    doneCount.innerHTML = TasksData["done"].length;
}


// using task name remove items from localstorage via del btn
function removeTaskFromButton(col, task) {
    let taskName = task.querySelector(".task-text h2").innerHTML;

    TasksData[col] = TasksData[col].filter(item => item.title !== taskName);
    updateDataAndCount()
}


// it contain dragged item store into variable
tasks.forEach((task) => {
    task.addEventListener('drag', () => {
        draggedItem = task
    })
})


// that delete task from storage and dom
buttons.forEach((button) => {
    let task = button.closest(".task");
    let column = button.closest(".tasks-cols").id;

    button.addEventListener('click', () => {
        // it remove task from html dom
        task.remove()

        removeTaskFromButton(column, task)
    })
})


// when submit btn click it add 
AddTaskSubmit.addEventListener('submit', (e) => {
    const task = { "title": AddTaskTitle.value, "description": AddTaskDescription.value }

    TasksData["todo"].push(task)
    AddTaskIntoDOM(todo, task);
    updateDataAndCount();
})

AddTaskBtn.addEventListener('click', () => NewTaskContainer.classList.add('new-task-container-block'))


// for remove class when click background
NewTaskContainer.addEventListener('click', (e) => {
    if (e.target === NewTaskContainer) {
        NewTaskContainer.classList.remove('new-task-container-block');
    }
})


DragAndDrop(todo)
DragAndDrop(progress)
DragAndDrop(done)