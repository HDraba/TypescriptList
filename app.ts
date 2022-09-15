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

    dropzone.appendChild(listHeaderDiv);
    listHeaderDiv.appendChild(listHeader);

    dropzone.appendChild(unorderedListDiv);
    unorderedListDiv.appendChild(this.domElement);
  }
  render() {
    this.resetInput();

    this.domElement.innerHTML = '';

    // console.log(activeArray);
    this.array.forEach((listItem) => {
      listItem.render(this.domElement);
    });
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

    listEl!.appendChild(itemContainer);
  }

  move() {
     activeList.array = activeList.array.filter((entry) => {
      return entry.id !== this.id;
    });
    doneArray.push(this);

    doneList.render();
    activeList.render();
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = new ListItem();
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
