var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// let state: State= { //first edition
//  todos :[
//     {id:1,title:'Get milk' , done: false},
//     {id:2,title:'Get Bread' , done: true},
//  ],
//  selectedFilter : 'All',
// };
// const useState= <A>(state:A)=>{  //Generic (React)
//     let internalState = state;
//     const setState= (fn:(state:A)=>A)=>{
//         internalState = fn(internalState);
//         draw(internalState);
//     };
// };
var useState = function (state) {
    var internalState = state;
    var setState = function (fn) {
        internalState = fn(internalState);
        draw(internalState);
    };
    draw(internalState); //first time
    return [internalState, setState];
};
var _a = useState({
    todos: [
        { id: 1, title: "Get milk", done: false },
        { id: 2, title: "Get Bread", done: true },
    ],
    selectedFilter: "All",
}), state = _a[0], setState = _a[1];
var addTodo = function (todo) {
    var todoItem = {
        id: state.todos.length + 1,
        title: todo,
        done: false,
    };
    setState(function (state) { return (__assign(__assign({}, state), { todos: __spreadArray(__spreadArray([], state.todos, true), [todoItem], false) })); });
};
var toggleTodo = function (id) {
    setState(function (state) { return (__assign(__assign({}, state), { todos: __spreadArray([], state.todos.map(function (x) { return (x.id == id ? __assign(__assign({}, x), { done: !x.done }) : x); }), true) })); });
};
var setSelectedFilter = function (filter) {
    //state va filter jadid migire, state jadid return mikone
    console.log(filter);
    setState(function (state) { return (__assign(__assign({}, state), { selectedFilter: filter })); });
};
//view part
function draw(state) {
    console.log('call draw');
    var app = document.getElementById("app");
    if (app == null) {
        throw new Error("you should have a div with id app");
    }
    app.replaceChildren();
    // app.childNodes.forEach(x=>{
    //     console.log(x);
    //     app.removeChild(x);
    // });
    //[...app.children].forEach(ch=> app.removeChild(ch));
    function createButton(name) {
        var button = document.createElement("button");
        var text = document.createTextNode(name);
        button.append(text);
        return button;
    }
    var form = document.createElement("form");
    var input = document.createElement("input");
    var submit = createButton("Add Todo");
    input.placeholder = "Please add your task";
    form.append(input);
    form.append(submit);
    app.append(form);
    var ul = document.createElement("ul");
    app.append(ul);
    state.todos
        .filter(function (todoItem) {
        switch (state.selectedFilter) {
            case "All":
                return true;
            case "Todo":
                return !todoItem.done;
            case "Done":
                return todoItem.done;
        }
    })
        .map(function (todoItem) {
        console.log('heeeey, im here in state.todos.map');
        var li = document.createElement("li");
        var text = document.createTextNode(todoItem.title);
        li.style.cursor = "pointer";
        li.append(text);
        li.style.textDecoration = todoItem.done ? "line-through" : "none";
        return { id: todoItem.id, li: li };
    }) //inja map nabayad side effect dashte bashe. tuye map faqat 1 kar anjam mishe
        .forEach(function (_a) {
        var id = _a.id, li = _a.li;
        li.addEventListener("click", function () { toggleTodo(id); console.log('toggle id', id); });
        ul.append(li);
    });
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo(input.value);
        input.value = "";
    });
    function setSelectedButton(button) {
        button.style.backgroundColor = "white";
        button.style.border = "none";
    }
    function setNotSelectedButton(button) {
        button.style.backgroundColor = "#d6d6d6";
        button.style.border = "1px solid black";
    }
    function createFilterButton(name) {
        var button = createButton(name);
        button.style.backgroundColor = "#d6d6d6";
        button.style.border = "1px solid black";
        return button;
    }
    var filterContainer = document.createElement("div");
    var allButton = createFilterButton("All");
    var doneButton = createFilterButton("Done");
    var todoButton = createFilterButton("Todo");
    //hame aval notselected
    setNotSelectedButton(allButton);
    setNotSelectedButton(doneButton);
    setNotSelectedButton(todoButton);
    switch (state.selectedFilter) {
        case "All":
            setSelectedButton(allButton);
            break;
        case "Todo":
            setSelectedButton(todoButton);
            break;
        case "Done":
            setSelectedButton(doneButton);
            break;
    }
    filterContainer.append(allButton);
    filterContainer.append(todoButton);
    filterContainer.append(doneButton);
    allButton.addEventListener('click', function (event) {
        setSelectedFilter('All');
    });
    todoButton.addEventListener('click', function (event) {
        setSelectedFilter('Todo');
    });
    doneButton.addEventListener('click', function (event) {
        setSelectedFilter('Done');
    });
    app.append(filterContainer);
} //end of draw
