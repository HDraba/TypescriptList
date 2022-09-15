// class = interface + mehr Funktionen, zb Instanzierung
// Liste sollte die Liste rendern und das ListenItem das ListenItem - einzelne render Methoden 
// .find bei genau einem Wert, .filter bei mehreren 

let isUlRendered = false;
let activeArray: ListItem[];
let doneArray: ListItem[];
let counter: number = 0;

const formParent = document.getElementById('form-container')! as HTMLDivElement;
const form = document.getElementById('form')! as HTMLFormElement;
const addPrjBtn = document.getElementById('add-project')! as HTMLButtonElement;
const dropzone = document.getElementById('dropzone')! as HTMLDivElement;

const nameInput = document.getElementById('name')! as HTMLInputElement;
const ageInput = document.getElementById('age')! as HTMLInputElement;
const activityInput = document.getElementById('activity')! as HTMLInputElement;

class List {
  array: ListItem[];
  domElement: HTMLUListElement;

  constructor(public type: 'active' | 'done') {
    this.create(type);
    if (type === 'active') {
      this.array = activeArray = [];
    } else {
      this.array = doneArray = [];
    }
  }

  resetInput() {
    nameInput.value = '';
    activityInput.value = '';
    ageInput.value = '';
  }

  create(type) {
    counter++;

    const listHeaderDiv = document.createElement('div');
    listHeaderDiv.style.gridArea = 'header' + counter;
    const listHeader = document.createElement('h2');
    listHeader.textContent = type.toUpperCase() + ': ';

    const unorderedListDiv = document.createElement('div');
    unorderedListDiv.style.gridArea = 'list' + counter;
    this.domElement = document.createElement('ul');
// this-doElement statt unorderedList als Variable 

    dropzone.appendChild(listHeaderDiv);
    listHeaderDiv.appendChild(listHeader);

    dropzone.appendChild(unorderedListDiv);
    unorderedListDiv.appendChild(this.domElement);
  }
  render() {
    this.resetInput();

    this.domElement.innerHTML = '';
    // leeren der ul

    // console.log(activeArray);
    this.array.forEach((listItem) => {
      listItem.render(this.domElement);
    });
    // basierend auf dem array die Item render Methode abrufen für jedes Item
  }
}

const activeList = new List('active');
const doneList = new List('done');

class ListItem {
  name = nameInput.value;
  age = parseInt(ageInput.value, 10);
  activity = activityInput.value;
  color = this.getColor();
  id = Math.random();

  constructor() {
    this.addItemToArray();
  }
  getColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  addItemToArray() {
    if (this.name.length > 3 && this.age > 18 && this.activity.length > 5) {
      activeList.array.push(this);
    }
    console.log('active: ', activeList.array);
    console.log('done: ', doneArray);
    activeList.render()
  }

  render(listEl: HTMLUListElement) {
    const itemContainer = document.createElement('li');
    const nameEl = document.createElement('span');
    const ageEl = document.createElement('span');
    const activityEl = document.createElement('span');

    nameEl.textContent = 'Name: ' + this.name;
    ageEl.textContent = 'Age: ' + this.age.toString();
    activityEl.textContent = 'Activity: ' + this.activity;

    const itemMoveBtn = document.createElement('button');
    itemMoveBtn.textContent = 'DONE';
    itemMoveBtn.addEventListener('click', () => {
      this.move();
    });
    
    itemContainer.appendChild(nameEl);
    itemContainer.appendChild(ageEl);
    itemContainer.appendChild(activityEl);
    itemContainer.appendChild(itemMoveBtn);
    // itemContainer.style.boxShadow = `0px 0px 5px 5px #${this.color}`
    itemContainer.setAttribute('draggable', true)

    listEl!.appendChild(itemContainer);
  }

  move() {
    //  ************************************ new ***************************************
    if (activeList.array.includes(this)) {
    activeList.array = activeList.array.filter((entry) => {
      return entry.id !== this.id;
    });
      doneArray.push(this);
    }   else (
      doneList.array.splice(this)      
    )

    doneList.render();
    activeList.render();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = new ListItem();
});

