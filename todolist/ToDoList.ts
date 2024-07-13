
// enum TaskState {
//     Todo = 'Todo',
//     Done = 'Done',
// }

const TaskState = Object.freeze({
    TODO: 'TODO',
    DONE: 'DONE',
});

// type T = { id: string; age: number};
// type V = T['id' | 'age']

type TaskState = (typeof TaskState)[keyof typeof TaskState]


class ToDoList{ 
    constructor(private listName:string){
    }
    tasks = Array<Task>(); 
    
    add(task: Task) {
        this.tasks.push(task);
    }

    Show :Represent= () => { 
        for (const task of this.tasks) {
            console.log(`task number ${task.Id} with name ${task.Name} is in ${task.State} state ! `);
        };
    };
    
     
    readonly searchName : SearchName = (str) => { 
        return  this.tasks.filter(x=> x.Name.includes(str));
      };

     readonly removeTask :Remove = (taskName) => {
       const index= this.tasks.findIndex(x=> x.Name === taskName); 
       if(index == -1) return;

       this.tasks.splice(index,1);
     };

     readonly changeState :changeState = (taskName) => {
        const task =this.tasks.find(x=> x.Name === taskName);
        if(!task) return;
            task.State =  task.State===TaskState.TODO ? TaskState.DONE : TaskState.TODO;
     };
     
     readonly filter :Filter =(key , value)=>{
         return this.tasks.filter(x=> x[key]===value); 
     };
    
 
    }




 type Task = {
    Id: number;
    Name: string;
    State: TaskState;
};

type Add = (item : Task) => void ;
type Represent = (items: Array<Task>) => void ;
type SearchName = (str : string) => Array<Task>;
type Remove = (name : string) => void;
type changeState = (name : string) => void;
type Filter = (key: Key , value: string)=> Array<Task>;
type Key = keyof Task //'Id' | 'Name' | 'State' ;

export {};