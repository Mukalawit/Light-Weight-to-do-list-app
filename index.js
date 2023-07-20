let taskInput = document.querySelector('input');
let button = document.querySelector('button');
let taskContainer = document.querySelector('#task-container');
let tasks=[];
let toDo;
let myStoredTasks;
// localStorage.clear()
//# Save task to local Storage
function saveTaskToLocalStorage() {
    let storedData = getDataFromLocalStorage();
    
    if (storedData === null) {

        tasks.push(taskInput.value)
        toDo = JSON.stringify(tasks);

        localStorage.setItem('task', toDo);

    } else {
        tasks = JSON.parse(storedData)
        tasks.push(taskInput.value);

        toDo = JSON.stringify(tasks);
        localStorage.setItem('task', toDo)
    }
}
// # Load Tasks from localStorage
function getDataFromLocalStorage() {
    let myTasks = localStorage.getItem('task')
    if (!myTasks) {
        return null
    } else {
        //future tip; you can return the parsed string and avoid the repeated parsing
        // in the body of the code
        if(JSON.parse(myTasks).length === 0){
            return null
        }
        else{
            return myTasks;
        }

        
    }
}

function viewTasks() {
    myStoredTasks = getDataFromLocalStorage();
    console.log(myStoredTasks)
    taskContainer.innerHTML = "";
    if (myStoredTasks === null) {
        //optional--display no tasks yet
        let listItem = document.createElement('li')
        listItem.innerText = "There are no tasks to display, please add a task"
        taskContainer.appendChild(listItem)
    } else {
        
        myStoredTasks = JSON.parse(myStoredTasks);
        myStoredTasks.forEach((taskDescription, index) => {
            let listItem = document.createElement('li')
            let task = `<span>${taskDescription}</span>&nbsp;<button class='fas fa-edit edit' value=${index}></button>&nbsp;<button class="fa fa-trash delete" value='${taskDescription}'></button>`
            listItem.innerHTML = task;

            taskContainer.appendChild(listItem)

            editTask();
            deleteTask();

        })
    }

}

button.addEventListener('click', function (e) {
    e.preventDefault();
    if (taskInput.value !== "") {
        saveTaskToLocalStorage();
        taskInput.value = "";
        taskInput.setAttribute('placeholder', 'Enter a Task')
    }

    viewTasks();
})
viewTasks();

function editTask() {
    document.querySelectorAll('.edit').forEach(taskItem => {
        taskItem.addEventListener('click', function (e) {
            e.preventDefault();
            myStoredTasks = getDataFromLocalStorage();
            if (myStoredTasks) {
                myStoredTasks = JSON.parse(myStoredTasks);
                let form = document.createElement('form');
                form.setAttribute('id', 'update')
                updateTask = document.createElement('input')
                updateTask.setAttribute('placeholder', `${myStoredTasks[e.target.value]}`)
                let submitButton = document.createElement('button');
                submitButton.setAttribute('class','fa fa-refresh')
                //submitButton.innerText = "Update";
                submitButton.setAttribute('value', e.target.value)
                form.appendChild(updateTask)
                form.appendChild(submitButton)
                let editContainer = document.querySelector('#edit-container')
                editContainer.replaceChildren();
                editContainer.appendChild(form);



                let updateForm = document.querySelector('#update');

                updateForm.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (updateTask.value !== "") {
                        myStoredTasks = JSON.parse(getDataFromLocalStorage());
                        //update the value in the array
                        myStoredTasks[e.target.value] = updateTask.value;

                        myStoredTasks = JSON.stringify(myStoredTasks);

                        localStorage.setItem('task', myStoredTasks);

                        viewTasks();
                        editContainer.replaceChildren();
                    }

                })
            }

        })
    })
}

function deleteTask() {

    document.querySelectorAll('.delete').forEach(taskItem => {

        taskItem.addEventListener('click', function (e) {
            e.preventDefault();

            myStoredTasks = JSON.parse(getDataFromLocalStorage());

            let index = myStoredTasks.indexOf(e.target.value)
            if (index !== -1) {
                // perform the delete action
                myStoredTasks.splice(index, 1);

                myStoredTasks = JSON.stringify(myStoredTasks);

                localStorage.setItem('task', myStoredTasks);

            }


            viewTasks();

        })

    })

}





