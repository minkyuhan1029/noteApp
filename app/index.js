const addBtn = document.getElementById('add-btn')
const noteList = document.getElementById('notes')
let highlightNote = null;
let noteColors = ['#ff65a3', '#7afcff', '#feff9c', '#ff7eb9', '#b5e7a0', '#fff740']


function makeNote() {
  let content = document.getElementById('input-text').value

  //Condition to let only 36 notes be allowed
  if (noteList.length >= 36) {
    window.alert('Only 36 notes are allowed.')
    return;
  }
  // Create a variable that is structured HTML that will create a 'Note'
  // Each time you create a note, it will be added to the parent note-list div

  const noteBody = `
  <div class='card-body' onclick=swapNotes(this)>
    <p class='card-text'>${content}</p>
    </div>
    <span>
    <button id='edit-btn' class="btn btn-primary" onclick=editNote(this.parentNode.parentNode) class ='button'>Edit</button>
  <button id='delete-btn' class="btn btn-danger" onclick=deleteNote(this.parentNode.parentNode) class ='button'>Delete</button>
</span>
  `
  let newNote = document.createElement('div');
  newNote.className = "card mx-4 my-2 text-black"
  newNote.style = `width:10rem;padding-left:0%;padding-right:0%; background-color: ${useColors()}`
  newNote.innerHTML = noteBody
  noteList.appendChild(newNote);
  document.getElementById('input-text').value = ''
}

function editNote(note) {
  // Grabs the element and sets contentEditable to true
  // After 'Enter' is pressed, set contentEditable to false so it doesn't persist
  let text = note.getElementsByTagName('p')[0]
  text.contentEditable = true;
  this.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      text.contentEditable = false;
    }
  })
}

function deleteNote(note) {
  // Deletes the entire note using the context of this.parentNode
  note.remove();

  highlightNote = null;
}

function swapNotes(note) {
  if (!highlightNote) {
    highlightNote = note
    note.parentNode.style.border = 'dashed blue'
  }
  else if (highlightNote === note) {
    highlightNote = null;
    note.parentNode.style.border = 'none'
  }
  else {
    note.parentNode.style.border = 'none'
    highlightNote.parentNode.style.border = 'none'
    const prevNode = note.previousSibling;
    highlightNote.replaceWith(note)
    prevNode.after(highlightNote)
    highlightNote = null
  }
}

function useColors() {
  let color = noteColors.shift()
  noteColors.push(color)
  return color;
}

addBtn.addEventListener('click', makeNote)
