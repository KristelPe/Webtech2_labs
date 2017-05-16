class NotesApp {
     constructor(){
         this.notesContainer = document.querySelector(".notes");
         this.notesInput = document.querySelector("#txtAddNote");
         this.btnAdd = document.getElementById("btnAddNote");
         this.btnAdd.addEventListener("click", this.addNote.bind(this));
         this.loadNotes();
     }
     
     addNote(e){
         let message = this.notesInput.value;
         let newNote = document.createElement("div");
         let deleteLink = document.createElement("a");
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
 
     removeNote(event){
         let elementToDelete = event.target.parentElement;
         console.log(elementToDelete.firstElementChild.innerHTML);
         this.notesContainer.removeChild(elementToDelete);
         console.log(event);
         event.preventDefault();
     }
    

 
     resetNotesForm(){ 
         this.notesInput.value = "";
         this.notesInput.focus();
     }
    
    saveNote(){
        let x = document.getElementById("cards").childElementCount;
        localStorage.setItem(x,this.notesInput.value)
        localStorage.setItem("x",x)
        console.log(localStorage.getItem(x))
        console.log(localStorage.getItem("x"))
        
    }
    
    loadNotes(){
        let i = localStorage.getItem("x");
        let x = 0;
        while(x<i){
        x = x + 1;
            if(localStorage.getItem(x)!= ""){
        let message = localStorage.getItem(x);
        this.notesInput.value = message;
        let newNote = document.createElement("div");
        let deleteLink = document.createElement("a");
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
    
 }
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