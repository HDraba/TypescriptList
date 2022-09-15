// class = interface + mehr Funktionen, zb Instanzierung
// Liste sollte die Liste rendern und das ListenItem das ListenItem - einzelne render Methoden 
// .find bei genau einem Wert, .filter bei mehreren 
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
        // this-doElement statt unorderedList als Variable 
        dropzone.appendChild(listHeaderDiv);
        listHeaderDiv.appendChild(listHeader);
        dropzone.appendChild(unorderedListDiv);
        unorderedListDiv.appendChild(this.domElement);
    };
    List.prototype.render = function () {
        var _this = this;
        this.resetInput();
        this.domElement.innerHTML = '';
        // leeren der ul
        // console.log(activeArray);
        this.array.forEach(function (listItem) {
            listItem.render(_this.domElement);
        });
        // basierend auf dem array die Item render Methode abrufen für jedes Item
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
        // itemContainer.style.boxShadow = `0px 0px 5px 5px #${this.color}`
        itemContainer.setAttribute('draggable', true);
        listEl.appendChild(itemContainer);
    };
    ListItem.prototype.move = function () {
        var _this = this;
        //  ************************************ new ***************************************
        if (activeList.array.includes(this)) {
            activeList.array = activeList.array.filter(function (entry) {
                return entry.id !== _this.id;
            });
            doneArray.push(this);
        }
        else
            (doneList.array.splice(this));
        doneList.render();
        activeList.render();
    };
    return ListItem;
}());
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var item = new ListItem();
});
