document.addEventListener("DOMContentLoaded",()=>{
  const storedTask=JSON.parse(localStorage.getItem("list"))
  if(storedTask){
    storedTask.forEach((task)=>list.push(task));
    
    updateTasklist();
    updateStats();
  }
})

let list=[];
const saveTask=()=>{
  localStorage.setItem("list",JSON.stringify(list));
};
let addTask=()=>{
const taskInput=document.getElementById("taskInput");
const text=taskInput.value.trim();
if(text){
  list.push({text:text,completed:false});
  taskInput.value="";
  updateTasklist();
  updateStats();
  saveTask();


}
};
 
const toggleTastcomplete=(index)=>{
  list[index].completed=!list[index].completed;
    updateTasklist();
    updateStats();
    saveTask();

  
   }
   const deleteTask=(index)=>{
    list.splice(index,1);
    updateTasklist();
    updateStats();
    saveTask();

   
  
  };
  const editTask=(index)=>{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=list[index].text;
      deleteTask(index);
    updateTasklist();
    updateStats();
    saveTask();

    

  }
  const updateStats=()=>{
    const  total=list.length;
    const completedTasks=list.filter(task=>task.completed).length;

    const progress=(completedTasks/total)*100;
    const progressbar=document.getElementById("progress");
    if(list.length==0){
      progressbar.style.width=`0%`; 
    }  
    progressbar.style.width=`${progress}%`; 
     const numbers=document.getElementById("numbers").innerHTML=`${completedTasks}/${total}`
  if(completedTasks  ==total || list.length==0){
    animation();
  }
   
    
  };

const updateTasklist=()=>{
  const tasklist=document.getElementById('tasklist');
  tasklist.innerHTML='';
  list.forEach((task,index)=>{
  const listitem=document.createElement('li')
  listitem.innerHTML=`
   <div class="taskItem">
      <div class="task ${task.completed ?"completed":''}">
        <input type="checkbox" class="checkbox" ${task.completed?'checked':''}/>
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <img src="./img/edit.png"  onClick="editTask(${index})">
        <img src="./img/bin.png" onClick="deleteTask(${index}) ">
      </div>
    </div>
  `;
  listitem.addEventListener('change',()=>toggleTastcomplete(index))
  tasklist.append(listitem);
  }
  )
}
document.getElementById("newtask").addEventListener("click",function(e){
  e.preventDefault();
  addTask();
});

const animation=()=>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}



 
