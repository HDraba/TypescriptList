var isUlRendered = false;
var activeArray;
var doneArray;
var counter = 0;
var formParent = document.getElementById('form-container');
var form = document.getElementById('form');
var addPrjBtn = document.getElementById('add-project');
var dropzone = document.getElementById('dropzone');
var nameInput = document.getElementById('name');
var ageInput = document.getElementById('age');
var activityInput = document.getElementById('activity');
var List = /** @class */ (function () {
    function List(type) {
        this.type = type;
        this.createList(type);
    }
    List.prototype.resetInput = function () {
        nameInput.value = '';
        activityInput.value = '';
        ageInput.value = '';
    };
    List.prototype.createList = function (type) {
        counter++;
        var listHeaderDiv = document.createElement('div');
        listHeaderDiv.style.gridArea = 'header' + counter;
        var listHeader = document.createElement('h2');
        listHeader.textContent = type.toUpperCase() + ': ';
        var unorderedListDiv = document.createElement('div');
        unorderedListDiv.style.gridArea = 'list' + counter;
        var unorderedList = document.createElement('ul');
        dropzone.appendChild(listHeaderDiv);
        listHeaderDiv.appendChild(listHeader);
        dropzone.appendChild(unorderedListDiv);
        unorderedListDiv.appendChild(unorderedList);
        if (type === 'active') {
            activeArray = [];
        }
        else {
            doneArray = [];
        }
    };
    List.prototype.renderList = function () {
        this.resetInput();
        activeListEl.innerHTML = '';
        // console.log(activeArray);
        activeArray.forEach(function (element) {
            var itemContainer = document.createElement('li');
            // itemContainer.style.border = `5px solid #${this.color}`;
            var nameEl = document.createElement('span');
            var ageEl = document.createElement('span');
            var activityEl = document.createElement('span');
            nameEl.textContent = 'Name: ' + element.name;
            ageEl.textContent = 'Age: ' + element.age.toString();
            activityEl.textContent = 'Activity: ' + element.activity;
            var itemMoveBtn = document.createElement('button');
            itemMoveBtn.textContent = 'DONE';
            // itemMoveBtn.style.boxShadow = `0px 0px 5px 5px #${item.getColor()}`;
            itemContainer.appendChild(nameEl);
            itemContainer.appendChild(ageEl);
            itemContainer.appendChild(activityEl);
            itemContainer.appendChild(itemMoveBtn);
            activeListEl.appendChild(itemContainer);
            // }
        });
    };
    return List;
}());
var activeList = new List('active');
var activeListEl = dropzone.querySelector('ul');
var doneList = new List('done');
var doneListEl = activeListEl.nextSibling;
var ListItem = /** @class */ (function () {
    function ListItem() {
        this.name = nameInput.value;
        this.age = parseInt(ageInput.value, 10);
        this.activity = activityInput.value;
        this.color = this.getColor();
        this.id = Math.random();
        this.addItemToArray();
    }
    ListItem.prototype.getColor = function () {
        return Math.floor(Math.random() * 16777215).toString(16);
    };
    ListItem.prototype.addItemToArray = function () {
        var item = { name: this.name, age: this.age, activity: this.activity, id: this.id };
        if (this.name.length > 3 && this.age > 18 && this.activity.length > 5) {
            activeArray.push(item);
        }
        console.log('active: ', activeArray);
        console.log('done: ', doneArray);
    };
    return ListItem;
}());
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var item = new ListItem();
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
