// ==============================
// STUDENT PORTFOLIO JAVASCRIPT
// ==============================

// Welcome Message
window.addEventListener("load", function () {
    console.log("Welcome to Ikenna Joshua Salvation's Portfolio!");
});

// ==============================
// MOBILE MENU
// ==============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (icon.classList.contains("fa-bars")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        });

    });

}

// ==============================
// SMOOTH SCROLLING
// ==============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId.length <= 1) return;

        e.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// ==============================
// FADE IN ANIMATION
// ==============================

const sections = document.querySelectorAll("section");

if (sections.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    });

    sections.forEach(section => {

        section.classList.add("hidden");
        observer.observe(section);

    });

}

// ==============================
// FOOTER YEAR
// ==============================

const footerYear = document.querySelector(".year");

if (footerYear) {

    footerYear.textContent = new Date().getFullYear();

}

// ==============================
// BUTTON EFFECT
// ==============================

document.querySelectorAll(".btn").forEach(btn => {

    btn.addEventListener("mouseenter", function () {

        this.style.transform = "scale(1.05)";

    });

    btn.addEventListener("mouseleave", function () {

        this.style.transform = "scale(1)";

    });

});

// ==============================
// ACADEMIC PLANNER
// ==============================

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (taskList) {

    displayTasks();

}

function addTask() {

    if (!taskInput || !taskList) return;

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");
        return;

    }

    tasks.push({

        text: text,
        completed: false

    });

    saveTasks();

    taskInput.value = "";

    displayTasks();

}

function displayTasks() {

    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button class="complete-btn" onclick="toggleTask(${index})">
                    <i class="fas fa-check"></i>
                </button>

                <button class="delete-btn" onclick="deleteTask(${index})">
                    <i class="fas fa-trash"></i>
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}
