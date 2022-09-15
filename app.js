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
        this.create(type);
        if (type === 'active') {
            this.array = activeArray = [];
        }
        else {
            this.array = doneArray = [];
        }
    }
    List.prototype.resetInput = function () {
        nameInput.value = '';
        activityInput.value = '';
        ageInput.value = '';
    };
    List.prototype.create = function (type) {
        counter++;
        var listHeaderDiv = document.createElement('div');
        listHeaderDiv.style.gridArea = 'header' + counter;
        var listHeader = document.createElement('h2');
        listHeader.textContent = type.toUpperCase() + ': ';
        var unorderedListDiv = document.createElement('div');
        unorderedListDiv.style.gridArea = 'list' + counter;
        this.domElement = document.createElement('ul');
        dropzone.appendChild(listHeaderDiv);
        listHeaderDiv.appendChild(listHeader);
        dropzone.appendChild(unorderedListDiv);
        unorderedListDiv.appendChild(this.domElement);
    };
    List.prototype.render = function () {
        var _this = this;
        this.resetInput();
        this.domElement.innerHTML = '';
        // console.log(activeArray);
        this.array.forEach(function (listItem) {
            listItem.render(_this.domElement);
        });
    };
    return List;
}());
var activeList = new List('active');
var doneList = new List('done');
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
        if (this.name.length > 3 && this.age > 18 && this.activity.length > 5) {
            activeList.array.push(this);
        }
        console.log('active: ', activeList.array);
        console.log('done: ', doneArray);
        activeList.render();
    };
    ListItem.prototype.render = function (listEl) {
        var _this = this;
        var itemContainer = document.createElement('li');
        var nameEl = document.createElement('span');
        var ageEl = document.createElement('span');
        var activityEl = document.createElement('span');
        nameEl.textContent = 'Name: ' + this.name;
        ageEl.textContent = 'Age: ' + this.age.toString();
        activityEl.textContent = 'Activity: ' + this.activity;
        var itemMoveBtn = document.createElement('button');
        itemMoveBtn.textContent = 'DONE';
        itemMoveBtn.addEventListener('click', function () {
            _this.move();
        });
        itemContainer.appendChild(nameEl);
        itemContainer.appendChild(ageEl);
        itemContainer.appendChild(activityEl);
        itemContainer.appendChild(itemMoveBtn);
        listEl.appendChild(itemContainer);
    };
    ListItem.prototype.move = function () {
        var _this = this;
        activeList.array = activeList.array.filter(function (entry) {
            return entry.id !== _this.id;
        });
        doneArray.push(this);
        doneList.render();
        activeList.render();
    };
    return ListItem;
}());
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var item = new ListItem();
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
