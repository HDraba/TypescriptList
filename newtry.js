var ListState;
(function (ListState) {
    ListState["active"] = "active";
    ListState["done"] = "done";
})(ListState || (ListState = {}));
var activeList = [];
var doneList = [];
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
    }
    ProjectInput.prototype.gatherInput = function () {
    };
    return ProjectInput;
}());
var List = /** @class */ (function () {
    function List() {
    }
    return List;
}());
var ListItem = /** @class */ (function () {
    function ListItem() {
    }
    return ListItem;
}());
