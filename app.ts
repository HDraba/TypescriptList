interface UserEntry {
  name: string;
  age: number;
  activity: string;
}

let isUlRendered = false;
let activeArray: UserEntry[];
let doneArray: UserEntry[];
let counter: number = 0;

const formParent = document.getElementById('form-container')! as HTMLDivElement;
const form = document.getElementById('form')! as HTMLFormElement;
const addPrjBtn = document.getElementById('add-project')! as HTMLButtonElement;
const dropzone = document.getElementById('dropzone')! as HTMLDivElement;

const nameInput = document.getElementById('name')! as HTMLInputElement;
const ageInput = document.getElementById('age')! as HTMLInputElement;
const activityInput = document.getElementById('activity')! as HTMLInputElement;

class List {
  constructor(public type: 'active' | 'done') {
    this.createList(type);
  }
  
  resetInput() {
    nameInput.value = '';
    activityInput.value = '';
    ageInput.value = '';
  }

  createList(type) {
    counter++;
    
    const listHeaderDiv = document.createElement('div');
    listHeaderDiv.style.gridArea = 'header' + counter;
    const listHeader = document.createElement('h2');
    listHeader.textContent = type.toUpperCase() + ': ';
    
    const unorderedListDiv = document.createElement('div');
    unorderedListDiv.style.gridArea = 'list' + counter;
    const unorderedList = document.createElement('ul');
    
    dropzone.appendChild(listHeaderDiv);
    listHeaderDiv.appendChild(listHeader);
    
    dropzone.appendChild(unorderedListDiv);
    unorderedListDiv.appendChild(unorderedList);
    if (type === 'active') {
      activeArray = [];
    } else {
      doneArray = [];
    }
  }
  renderList() {
    this.resetInput();
    
    activeListEl!.innerHTML = '';
    // console.log(activeArray);
    activeArray.forEach((element) => {
      const itemContainer = document.createElement('li');
      // itemContainer.style.border = `5px solid #${this.color}`;
      const nameEl = document.createElement('span');
      const ageEl = document.createElement('span');
      const activityEl = document.createElement('span');
      
      nameEl.textContent = 'Name: ' + element.name;
      ageEl.textContent = 'Age: ' + element.age.toString();
      activityEl.textContent = 'Activity: ' + element.activity;
      
      const itemMoveBtn = document.createElement('button');
      itemMoveBtn.textContent = 'DONE';
      // itemMoveBtn.style.boxShadow = `0px 0px 5px 5px #${item.getColor()}`;
      
      itemContainer.appendChild(nameEl);
      itemContainer.appendChild(ageEl);
      itemContainer.appendChild(activityEl);
      itemContainer.appendChild(itemMoveBtn);
      
      activeListEl!.appendChild(itemContainer);
      // }
    });
  }
}

const activeList = new List('active');
const activeListEl = dropzone.querySelector('ul');

const doneList = new List('done');
const doneListEl = activeListEl!.nextSibling;

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
    const item = { name: this.name, age: this.age, activity: this.activity, id: this.id };
    if (this.name.length > 3 && this.age > 18 && this.activity.length > 5) {
      activeArray.push(item);
    }
    console.log('active: ', activeArray);
    console.log('done: ', doneArray);
    
  }

  // move() {
    // activeArray.filter((entry => {
      // if (clickedId === this.id) {
        // activeArray.splice(1);
        // doneArray.push(entry)
      // }
    // }))

    // }
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = new ListItem();
  activeList.renderList();

  // const listItem = new ListItem();
});

/*
// const renderList = () => {
// createUnorderedLists(() => createListItem())
// }

let active: HTMLUListElement;
let counter: number = 1;
const createUnorderedLists = () => {
  if (!isUlRendered) {
    active = document.createElement('ul');
    active.textContent = 'ACTIVE';
    const done = document.createElement('ul');
    done.textContent = 'DONE';
    dropzone.appendChild(active);
    dropzone.appendChild(done);
    isUlRendered = true;
  }
  const createListItem = () => {
    const newElContainer = document.createElement('div');

    const liHeader = document.createElement('h2');
    liHeader.textContent = `Item ${counter}`;
    
    const newLiElName = document.createElement('li');
    newLiElName.textContent = 'Name: ' + nameInput.value;

    const newLiElAge = document.createElement('li');
    newLiElAge.textContent = 'Age: ' + ageInput.value;

    const newLiElActivity = document.createElement('li');
    newLiElActivity.textContent = 'Activity: ' + activityInput.value;

    const newLiElBtn = document.createElement('button');
    newLiElBtn.textContent = 'DONE';

    counter++;
    newElContainer.appendChild(liHeader);
    newElContainer.appendChild(newLiElName);
    newElContainer.appendChild(newLiElAge);
    newElContainer.appendChild(newLiElActivity);
    newElContainer.appendChild(newLiElBtn);
    active.appendChild(newElContainer);
  };
  createListItem();
};

const clearInputs = () => {
  nameInput.value = '';
  ageInput.value = '';
  activityInput.value = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //   renderList()
  createUnorderedLists();
  //   createListItem()
  //   const obj = {
  // nameValue: nameInput.value,
  // ageValue: ageInput.value,
  // activityValue: activityInput.value,
  //   };
  //   console.log(obj.nameValue);
  clearInputs();
});
*/
