var apiUrl = 'http://localhost:8080';

function getRequest(url){
  return new Promise(function(resolve,reject){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',apiUrl + url);
    xhr.onload = function(){
      return resolve(xhr.responseText);
    };
    xhr.send();
  });
}

function postRequest(url,data){
  return new Promise(function(resolve,reject){
    var xhr = new XMLHttpRequest();
    xhr.open('POST',apiUrl + url);
    xhr.onload = function(){
      return resolve(xhr.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));    
  });
}

function load(){
  getRequest('/developers').then(function(data){  
    var developers = JSON.parse(data);
    var container = document.querySelector('#row1');
    container.innerHTML = '';
    
    for(var developer in developers){
      var devString = `
      <div class="anketa">
        <div class="anketa__pic">
          <img src="./assets/img/${developers[developer].avatar}" alt="PICTURE" class="anketa__pic-img">
        </div>
        <div class="anketa__content">
          <div class="anketa__content__name">
            <input disabled type="text" placeholder ="Name" id="nameInput" value="${developers[developer].name}">
            <input disabled type="text" id="lastNameInput" placeholder ="Surname"value="${developers[developer].last_name}">
          </div>
          <div class="anketa__content__about">
            <ul>
            <li class="anketa__content__about-item">Birthday:&nbsp;<input disabled type="date" id="birthdayInput"  value="${developers[developer].birthday}"></li>
            <li class="anketa__content__about-item">Age:&nbsp<input disabled id="ageInput" type="number" min="0" max="122" value="${developers[developer].age}"></li>
            <li class="anketa__content__about-item">City:&nbsp<input disabled id="cityInput" type="text"  value="${developers[developer].city}"></li>
            <li class="anketa__content__about-item">Cellphone:&nbsp<input disabled id="cellphoneInput" value="${developers[developer].cellphone}"></li>
            <li class="anketa__content__about-item">Email:&nbsp<input disabled id="emailInput" value="${developers[developer].email}"></li>
          </ul>
          </div>
          <div class="anketa__content__hobby">
           <textarea  placeholder="tell us about yourself with 77 symbols max"   disabled type="text" id="hobbyTextArea">${developers[developer].hobby}</textarea>    
          </div>
        </div>
      </div> 
      `;
      
      container.innerHTML+=devString;

     }
  })
}

document.addEventListener('DOMContentLoaded',load);
String.prototype.validateStr = function(regexObj){
 return regexObj.test(this);
}


function save(){
  var data = {};
  var anketas = document.querySelectorAll('.anketa');

  for(var i = 0; i < anketas.length; i++){
    var tempDeveloper = {
      name: anketas[i].querySelector('#nameInput').value,
      last_name: anketas[i].querySelector('#lastNameInput').value,
      birthday: anketas[i].querySelector('#birthdayInput').value,
      age: anketas[i].querySelector('#ageInput').value,
      city: anketas[i].querySelector('#cityInput').value,
      cellphone: anketas[i].querySelector('#cellphoneInput').value,
      email: anketas[i].querySelector('#emailInput').value,
      hobby: anketas[i].querySelector('#hobbyTextArea').value,
      avatar: anketas[i].querySelector('.anketa__pic-img').getAttribute('src').replace('./assets/img/','')
    }
    if(tempDeveloper.name.validateStr(/[0-9!#$%&'*+/=?^_`{|}~-]/) ||tempDeveloper.last_name.validateStr(/[0-9!#$%&'*+/=?^_`{|}~-]/)){
      return alert('Insert valid name and last name');
    }
    if(!tempDeveloper.cellphone.validateStr(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
      return alert(`Insert valid cellphone number format: 'XXX-XXX-XXXX'`);
    }
    if(!tempDeveloper.email.validateStr(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return alert('Insert valid e-mail');
    }
    if(tempDeveloper.age <= 0 || tempDeveloper.age >= 122){
      return alert('Insert valid age');
    }
    if(tempDeveloper.city.length >= 30){
      return alert(`Insert valid city 'length less 30 symbols'`)
    }
    if(tempDeveloper.hobby.length >= 77){
      return alert(`Insert valid hobby 'length less 77 symbols'`)
    }
    
    data['developer' + (i + 1)] = tempDeveloper;
    
  }

  postRequest('/developers',data).then(function(data){
    console.log(data);
  })
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function(input){
    input.disabled = true;
  });
  var textAreas = document.querySelectorAll('textarea');
  textAreas.forEach(function(textarea){
    textarea.disabled = true;
  });
  document.querySelector('#saveBtn').disabled = true;
  document.querySelector('#editBtn').disabled = false;

}

document.querySelector('#saveBtn').addEventListener('click',save);

function edit(){
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function(input){
    input.disabled = false;
  });
  var textAreas = document.querySelectorAll('textarea');
  textAreas.forEach(function(textarea){
    textarea.disabled = false;
  });
  document.querySelector('#saveBtn').disabled = false;
  document.querySelector('#editBtn').disabled = true;

}

document.querySelector('#editBtn').addEventListener('click',edit);
