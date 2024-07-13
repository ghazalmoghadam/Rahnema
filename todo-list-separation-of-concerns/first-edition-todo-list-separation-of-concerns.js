const app= document.getElementById('app');
function createButton(name){
    const button = document.createElement('button');
    const text = document.createTextNode(name);
    button.append(text);
    return button;
}




const form = document.createElement('form');
const input = document.createElement('input');
const submit = createButton('Add Todo');
input.placeholder = 'Please add your task'

form.append(input);
form.append(submit);
app.append(form);
 
const ul = document.createElement('ul');
app.append(ul);
function addTodo(str)
{
    const li= document.createElement('li');
    const text = document.createTextNode(str);
    li.style.cursor = 'pointer';
    li.append(text);
    li.addEventListener('click', (event)=>{
        li.style.textDecoration = 
             li.style.textDecoration == 'line-through'? 'none':'line-through';
    });
    ul.append(li);
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTodo(input.value)
    input.value= '';
});

function setNotSelectedButton(button){
  button.style.backgroundColor= '#d6d6d6';
  button.style.border = '1px solid black';
};

function setSelectedButton(){
    button.style.backgroundColor= 'white';
    button.style.border = 'none';
};

const filterContainer = createElement('div');
const allButton = createButton('All');
const doneButton = createButton('Done');
const todoButton = createButton('Todo');

//همه چی در هم تنیده و نمیتونی چیزی رو جدا کنی و ماژول کنی
//فانکشنالینی کد وابسته به css شده
//تو حالت فبلتر شده باگ داریم موقع ادد کردن تسک جدید
todoButton.addEventListener('click', (event)=>{
    setSelectedButton(todoButton);
    setNotSelectedButton(doneButton);
    setNotSelectedButton(allButton);
    //remove lis from dom
    [...ul.children].forEach(x=> 
    {
        if(x.style.textDecoration!='line-through'){//= done
            x.style.display= 'list-item';
        }else{
            x.style.display= 'none';
        }
    });
});
doneButton.addEventListener('click', (event)=>{
    setSelectedButton(doneButton);
    setNotSelectedButton(todoButton);
    setNotSelectedButton(allButton);
    [...ul.children].forEach(x=> 
        {
            if(x.style.textDecoration=='line-through'){//= done
                x.style.display= 'list-item';
            }else{
                x.style.display= 'none';
            }
        });
});

allButton.addEventListener('click', (event)=>{
    setSelectedButton(allButton);
    setNotSelectedButton(doneButton);
    setNotSelectedButton(todoButton);

    [...ul.children].forEach(x=> 
        {
            x.style.display= 'list-item';
        });
});


setSelectedButton(allButton);
setNotSelectedButton(doneButton);
setNotSelectedButton(todoButton);
filterContainer.append(allButton);
filterContainer.append(todoButton);
filterContainer.append(doneButton);

app.append(filterContainer);