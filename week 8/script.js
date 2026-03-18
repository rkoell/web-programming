// ===============================
// Portfolio To-Do List (Week 8)
// Concepts: submit, preventDefault, input.value, trim,
// createElement, appendChild, remove, classList, localStorage
// ===============================


// ---------- 1) DOM SELECTION ----------

// Grab the form element (we listen for submit on the FORM)
const form = document.getElementById("taskForm");

// Grab the input element (we read what the user typed)
const input = document.getElementById("taskInput");

// grab the add button to allow it to be disabled
const submit = document.querySelector(".btn.primary");

// Grab the UL where tasks will be displayed
const taskList = document.getElementById("taskList");

// Grab the error message paragraph for validation feedback
const errorMessage = document.getElementById("errorMessage");

// Grab count elements so we can update totals
const totalCountEl = document.getElementById("totalCount");
const doneCountEl = document.getElementById("doneCount");

// Grab action buttons
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

// Grab all filter buttons (All/Active/Completed)
const filterButtons = document.querySelectorAll(".filters .btn");

// get search input
const searchInput = document.getElementById("searchInput");

// get character counter
const counter = document.getElementById("characterCounter");

// get no tasks message
const noTasks = document.getElementById("noTasks");


// ---------- 2) APP STATE ----------

// Our tasks array will store objects like:
// { id: 123, text: "Buy milk", done: false }
let tasks = [];

// Track which filter is active
let currentFilter = "all";

// track searchterm
let searchTerm = "";


// ---------- 3) LOCAL STORAGE HELPERS ----------

// Key name used in localStorage
const STORAGE_KEY = "portfolio_todo_tasks";

// Save tasks array into localStorage (as a string)
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Load tasks array from localStorage
function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);

  // If nothing saved, do nothing
  if (!saved) return;

  // Convert saved string back into array
  tasks = JSON.parse(saved);
}


// ---------- 4) VALIDATION HELPERS ----------

// Show an error message on the page
function showError(message) {
  errorMessage.textContent = message;
}

// Clear the error message
function clearError() {
  errorMessage.textContent = "";
}

// toggles whether the submit button should be enabled
function toggleSubmit() {
  if (input.value.trim() === "") {
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }
}


// ---------- 5) RENDERING ----------

// Update Total and Completed counters
function updateCounts() {
  // Total tasks is length of tasks array
  const total = tasks.length;

  // Completed tasks = count tasks where done is true
  const completed = tasks.filter(t => t.done).length;

  // Update UI text
  totalCountEl.textContent = `Total: ${total}`;
  doneCountEl.textContent = `Completed: ${completed}`;
}

// Decide if a task should be visible based on currentFilter. integrating to work with search too
function passesFilter(task) {
  let passFilter = false;
  if (currentFilter === "all") passFilter =  true;          // show everything
  if (currentFilter === "active") passFilter = !task.done; // show only not done
  if (currentFilter === "completed") passFilter = task.done; // show only done
  if (!passFilter) return false;
  if (searchTerm === "") return true;
  return task.text.includes(searchTerm);
}

// Build ONE list item element for a task object
function createTaskElement(task) {
  // Create the <li>
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.id = task.id; // store id on the element for easy lookup

  // Create the task text <span>
  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = task.text;

  // timestamp
  const timeSpan = document.createElement("span");
  span.appendChild(timeSpan);
  const date = new Date(task.timestamp);
  let hour = date.getHours()
  let ampm;
  if (hour >= 12) {
    ampm = 'PM';
  } else {
    ampm = 'AM';
  }
  if (hour > 12) {
    hour = hour % 12;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }
  timeSpan.textContent = ` - Added at ${hour}:${minute} ${ampm}`

  // If done, add done class
  if (task.done) {
    span.classList.add("done");
  }

  // Toggle done when clicking the text
  span.addEventListener("click", function () {
    // Flip done value
    task.done = !task.done;

    // Toggle CSS class
    span.classList.toggle("done");

    // Save + update counts (and re-render for filter correctness)
    saveTasks();
    render();
  });

  // Create a container for buttons
  const btnBox = document.createElement("div");
  btnBox.classList.add("task-buttons");

  // edit button
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Edit";
  editBtn.classList.add("btn", "danger", "small");

  // prompt edit on click
  editBtn.addEventListener("click", function () {
    const editedText = prompt(task.text);

    if (editedText === null) {
      return;
    }

    task.text = editedText;

    saveTasks();
    render();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.textContent = "Delete";
  delBtn.classList.add("btn", "danger", "small");

  // Remove task on click
  delBtn.addEventListener("click", function () {
    // Keep only tasks that do NOT match this task id
    tasks = tasks.filter(t => t.id !== task.id);

    // Save + re-render
    saveTasks();
    render();
  });

  // Add span + buttons to the list item
  btnBox.appendChild(editBtn);
  btnBox.appendChild(delBtn);
  li.appendChild(span);
  li.appendChild(btnBox);

  return li;
}

// Render the entire list based on tasks + filter
function render() {
  // Clear the current list UI
  taskList.innerHTML = "";

  // make no tasks message go away when there are tasks
  if (tasks.length === 0) noTasks.style.display = "block";
  else noTasks.style.display = "none";

  // For each task, if it passes the filter, add it
  for (const task of tasks) {
    if (passesFilter(task)) {
      const li = createTaskElement(task);
      taskList.appendChild(li);
    }
  }

  // Update counters every render
  updateCounts();
}


// ---------- 6) EVENTS ----------

// Handle form submission (Add task)
form.addEventListener("submit", function (event) {
  // Stop the page refresh
  event.preventDefault();

  // Read and clean input
  const text = input.value.trim();

  // Validate
  if (text === "") {
    showError("Task cannot be empty.");
    return;
  }


  // Clear any previous error
  clearError();


  // check duplicates
  const isDuplicate = tasks.find(task => task.text === text);

  if (isDuplicate) {
    showError("Task already exists.");
    return;
  }

  // clearing error again
  clearError();

  // reset text counter to 0
  counter.textContent = "Characters = 0";


  // Create a new task object
  const newTask = {
    id: Date.now(),   // simple unique id
    text: text,       // what user typed
    done: false,      // default not completed
    timestamp: Date.now()
  };

  // Add it to tasks array
  tasks.push(newTask);

  // Save to localStorage
  saveTasks();

  // Clear input box
  input.value = "";
  //update togglesubmit after clearing
  toggleSubmit();

  // Re-render list
  render();
});

// Clear error while user types (nice UX)
input.addEventListener("input", function () {
  if (input.value.trim() !== "") {
    clearError();
  }
  // things for character counter
  const count = input.value.length;
  counter.textContent = `Characters = ${count}`;

  toggleSubmit();
});

// Clear completed tasks
clearCompletedBtn.addEventListener("click", function () {
  // Keep only tasks that are NOT done
  tasks = tasks.filter(t => !t.done);

  // Save + re-render
  saveTasks();
  render();
});

// Clear all tasks
clearAllBtn.addEventListener("click", function () {
  const confirmDelete = confirm("Are you sure you want to delete all tasks?");
  
  if (!confirmDelete) {
    return;
  }

  // Remove everything
  tasks = [];

  // Save + re-render
  saveTasks();
  render();
});

// search event listener
searchInput.addEventListener("input", function () {
    searchTerm = searchInput.value;
    render();
  })

// Filter buttons (All / Active / Completed)
for (const btn of filterButtons) {
  btn.addEventListener("click", function () {
    // Read filter value from data-filter attribute
    currentFilter = btn.dataset.filter;

    // Update button highlight
    for (const b of filterButtons) {
      b.classList.remove("active");
    }
    btn.classList.add("active");

    // Re-render list with new filter
    render();
  });
}


// ---------- 7) INIT ----------

// Load saved tasks when page opens
loadTasks();

// Render tasks immediately
render();

// set submit button state
toggleSubmit();