"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotesApp = function () {
    function NotesApp() {
        _classCallCheck(this, NotesApp);

        this.notesContainer = document.querySelector(".notes");
        this.notesInput = document.querySelector("#txtAddNote");
        this.btnAdd = document.getElementById("btnAddNote");
        this.btnAdd.addEventListener("click", this.addNote.bind(this));
        this.loadNotes();
    }

    _createClass(NotesApp, [{
        key: "addNote",
        value: function addNote(e) {
            var message = this.notesInput.value;
            var newNote = document.createElement("div");
            var deleteLink = document.createElement("a");
            deleteLink.setAttribute("class", "card-remove");
            deleteLink.setAttribute("href", "#");
            deleteLink.innerHTML = "Remove";
            deleteLink.addEventListener("click", this.removeNote.bind(this));
            newNote.innerHTML = "<p>" + message + "</p>";
            newNote.setAttribute("class", "card");
            newNote.appendChild(deleteLink);
            this.notesContainer.appendChild(newNote);
            this.saveNote();
            this.resetNotesForm();
            e.preventDefault();
        }
    }, {
        key: "removeNote",
        value: function removeNote(event) {
            var elementToDelete = event.target.parentElement;
            console.log(elementToDelete.firstElementChild.innerHTML);
            this.notesContainer.removeChild(elementToDelete);
            console.log(event);
            event.preventDefault();
        }
    }, {
        key: "resetNotesForm",
        value: function resetNotesForm() {
            this.notesInput.value = "";
            this.notesInput.focus();
        }
    }, {
        key: "saveNote",
        value: function saveNote() {
            var x = document.getElementById("cards").childElementCount;
            localStorage.setItem(x, this.notesInput.value);
            localStorage.setItem("x", x);
            console.log(localStorage.getItem(x));
            console.log(localStorage.getItem("x"));
        }
    }, {
        key: "loadNotes",
        value: function loadNotes() {
            var i = localStorage.getItem("x");
            var x = 0;
            while (x < i) {
                x = x + 1;
                if (localStorage.getItem(x) != "") {
                    var message = localStorage.getItem(x);
                    this.notesInput.value = message;
                    var newNote = document.createElement("div");
                    var deleteLink = document.createElement("a");
                    deleteLink.setAttribute("class", "card-remove");
                    deleteLink.setAttribute("href", "#");
                    deleteLink.innerHTML = "Remove";
                    deleteLink.addEventListener("click", this.removeNote.bind(this));
                    newNote.innerHTML = "<p>" + message + "</p>";
                    newNote.setAttribute("class", "card");
                    newNote.appendChild(deleteLink);
                    this.notesContainer.appendChild(newNote);
                    this.saveNote();
                    this.resetNotesForm();
                }
            }
        }
    }]);

    return NotesApp;
}();

var app = new NotesApp();

/*function CardApp() {
    this.buttonAddNote = document.getElementById("btnAddNote");
    this.notesContainer = document.querySelector(".notes");
    this.noteInput = document.querySelector("#txtAddNote");
    
    this.buttonAddNote.addEventListener("click", this.addNote.bind(this));
}

CardApp.prototype.resetForm = function(){
    this.noteInput.value = "";
    this.noteInput.focus();
}

CardApp.prototype.addNote = function(e){
    let newNote = document.createElement("div");
    newNote.setAttribute("class", "card");
    newNote.innerHTML = `<p> ${this.noteInput.value} </p>`;
    
    let noteLink = document.createElement("a");
    noteLink.setAttribute("class", "card-remove");
    noteLink.innerHTML = "Remove";
    noteLink.setAttribute("href", "#");
    noteLink.addEventListener("click", this.removeNote.bind(this));
    
    newNote.appendChild(noteLink);
    
    this.notesContainer.appendChild(newNote);
    this.resetForm;
}

CardApp.prototype.removeNote = function(e){
    let noteToRemove = e.target.parentElement;
    this.notesContainer.removeChild(noteToRemove);
    e.preventDefault();
}

let myApp = new CardApp();*/

//# sourceMappingURL=app.es5.js.map