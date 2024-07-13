//business  part
type Filter = "All" | "Todo" | "Done";

interface TodoItem {
  id: number;
  title: string;
  done: boolean;
}

interface State {
  todos: ReadonlyArray<TodoItem>;
  selectedFilter: Filter;
}

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

const useState = (state: State) => {
  let internalState = state;
  const setState = (fn: (state: State) => State) => {
    internalState = fn(internalState);
    draw(internalState);
  };

  draw(internalState); //first time
  return [internalState, setState] as const;
};

let [state, setState] = useState({
  todos: [
    { id: 1, title: "Get milk", done: false },
    { id: 2, title: "Get Bread", done: true },
  ],
  selectedFilter: "All",
});

const addTodo = function (todo: string) {
  const todoItem: TodoItem = {
    id: state.todos.length + 1,
    title: todo,
    done: false,
  };
  setState((state) => ({ ...state, todos: [...state.todos, todoItem] }));
};

const toggleTodo = (id: number) => {
  setState((state) => ({
    ...state,
    todos: [
      ...state.todos.map((x) => (x.id == id ? { ...x, done: !x.done } : x)),
    ],
  }));
};

const setSelectedFilter = (filter: Filter) => {
  //state va filter jadid migire, state jadid return mikone
  setState((state) => ({ ...state, selectedFilter: filter }));
};

//view part
function draw(state: State) {
  const app = document.getElementById("app");

  if (app == null) {
    throw new Error("you should have a div with id app");
  }

  app.replaceChildren();
  // app.childNodes.forEach(x=>{
  //     console.log(x);
  //     app.removeChild(x);
  // });
  //[...app.children].forEach(ch=> app.removeChild(ch));

  function createButton(name: string) {
    const button = document.createElement("button");
    const text = document.createTextNode(name);
    button.append(text);
    return button;
  }

  const form = document.createElement("form");
  const input = document.createElement("input");
  const submit = createButton("Add Todo");
  input.placeholder = "Please add your task";

  form.append(input);
  form.append(submit);
  app.append(form);

  const ul = document.createElement("ul");
  app.append(ul);

  state.todos
    .filter((todoItem) => {
      switch (state.selectedFilter) {
        case "All":
          return true;
        case "Todo":
          return !todoItem.done;
        case "Done":
          return todoItem.done;
      }
    })
    .map((todoItem) => {

      const li = document.createElement("li");
      const text = document.createTextNode(todoItem.title);
      li.style.cursor = "pointer";
      li.append(text);
      li.style.textDecoration = todoItem.done ? "line-through" : "none";
      
      return { id: todoItem.id, li };
    }) //inja map nabayad side effect dashte bashe. tuye map faqat 1 kar anjam mishe
    .forEach(({ id, li }) => {
      li.addEventListener("click", () => toggleTodo(id) );
      ul.append(li);
    });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo(input.value);
    input.value = "";
  });

  function setSelectedButton(button: HTMLButtonElement) {
    button.style.backgroundColor = "white";
    button.style.border = "none";
  }

  function setNotSelectedButton(button: HTMLButtonElement) {
    button.style.backgroundColor = "#d6d6d6";
    button.style.border = "1px solid black";
  }
  function createFilterButton(name: string) {
    const button = createButton(name);
    button.style.backgroundColor = "#d6d6d6";
    button.style.border = "1px solid black";  
    return button;
  }

  const filterContainer = document.createElement("div");
  const allButton = createFilterButton("All");
  const doneButton = createFilterButton("Done");
  const todoButton = createFilterButton("Todo");

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

  allButton.addEventListener('click', (event)=>{
    setSelectedFilter('All');
  });

  todoButton.addEventListener('click', (event)=>{
    setSelectedFilter('Todo');
  });
  doneButton.addEventListener('click', (event)=>{
    setSelectedFilter('Done');
  });



  app.append(filterContainer);
} //end of draw
