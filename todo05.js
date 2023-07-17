const inputBox = document.getElementById("input-box");
const toDoList = document.getElementById("toDoList");
const endedList = document.getElementById("endedList");

function addTask(){   
  // const task = input.value;
  if(inputBox.value === ''){
    alert("내용을 적으세요!");
  } else {
    let line = document.createElement("li");
    line.innerHTML = inputBox.value;
    toDoList.appendChild(line);

    createButtons(line);
  }
  inputBox.value = '';
  saveData();
}

//수정삭제버튼들함수 //챗치피티활용
function createButtons(line) {
  let span = document.createElement("span");
  span.innerHTML = line.innerHTML;
  line.innerHTML = '';
  line.appendChild(span);

  let delButton = document.createElement("delButton");
  delButton.innerHTML = "\u00d7";
  line.appendChild(delButton);
  
  let editButton = document.createElement("editButton");
  editButton.innerHTML = "수정";
  line.appendChild(editButton);
}


toDoList.addEventListener("click", function(e){
  if(e.target.tagName ==="LI"){
    e.target.classList.toggle("checked");
    if (e.target.classList.contains("checked")) {
      moveItem(e.target, toDoList, endedList);
    } else {
      // e.target.classList.toggle("checked");
      moveItem(e.target, endedList, toDoList);
    }
    saveData();
  }else if(e.target.tagName === "EDITBUTTON"){
    newToDo = prompt("수정 내용을 입력하세요");
    //e.target.parentElement.innerHTML = newToDo;
    e.target.parentElement.firstChild.innerHTML = newToDo;
  }else if(e.target.tagName === "DELBUTTON"){
    e.target.parentElement.remove();
    saveData();
  }
}, false);

endedList.addEventListener("click", function(e){
  if(e.target.tagName ==="LI"){
    //체크해제하면돌아옴
    e.target.classList.toggle("checked");
    if (e.target.classList.contains("checked")) {
    moveItem(e.target, toDoList, endedList);
    } else {
      moveItem(e.target, endedList, toDoList);
    }
    saveData();
  }else if(e.target.tagName === "DELBUTTON"){
    e.target.parentElement.remove();
    saveData();
  }else if(e.target.tagName === "EDITBUTTON"){
    newToDo = prompt("수정 내용을 입력하세요");
    //챗치피티활용
    //e.target.parentElement.innerHTML = newToDo;
    e.target.parentElement.firstChild.innerHTML = newToDo;
  }
}, false);

  showTask();

function moveItem(item, fromList, toList) {
  fromList.removeChild(item);
  toList.appendChild(item);
}

function saveData(){
  localStorage.setItem("p5-Ldata", toDoList.innerHTML);
  localStorage.setItem("p5-Fdata", endedList.innerHTML);
}

function showTask(){
  toDoList.innerHTML = localStorage.getItem("p5-Ldata");
  endedList.innerHTML = localStorage.getItem("p5-Fdata");
}

function dataReset(){
  toDoList.innerHTML = localStorage.getItem("");
  endedList.innerHTML = localStorage.getItem("");
}

