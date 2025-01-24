
const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

// Load notes from localStorage and display them
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Fallback to an empty string
}
showNotes();

// Update localStorage with the current state of notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}


createBtn.addEventListener("click", () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);

    notes = document.querySelectorAll(".input-box");
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
});

// Handle updates to notes using event delegation
notesContainer.addEventListener("keyup", function (e) {
    if (e.target.classList.contains("input-box")) {
        updateStorage();
    }
});

// Handle "Enter" key to insert line breaks
document.addEventListener("keydown", event => {
    if (event.key === "Enter" && document.activeElement.classList.contains("input-box")) {
        event.preventDefault(); 
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const br = document.createElement("br");
        range.insertNode(br);
        range.collapse(false); 
    }
});
