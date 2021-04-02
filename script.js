function check() {
    for (var i = 0; i < arrObjects.length; i++){
        var pattern = document.getElementById('sample').content;
        var copyHTML = document.importNode(pattern, true);
        copyHTML.querySelector(".name").textContent = arrObjects[i].name;
        copyHTML.querySelector(".age").textContent = arrObjects[i].age;
        copyHTML.querySelector(".descript").textContent = arrObjects[i].description;
        document.getElementById("app").appendChild(copyHTML);
    } 
}

// var arrObjects = [];

// arrObjects[0] = {
//     name: 'Kirill',
//     age: 20,
//     description: 'This guy is soo tired',
// }

// arrObjects[1] = {
//     name: 'Daniel',
//     age: 'IDFK',
//     description: 'This guy is my teammate',
// }

// arrObjects[2] = {
//     name: 'Tanya',
//     age: 'IDFK',
//     description: 'This girl is my teammate',
// }

// arrObjects[3] = {
//     name: 'Emil',
//     age: 'IDFK',
//     description: 'This guy is my teammate',
// }

// arrObjects[4] = {
//     name: 'Roman',
//     age: 'IDFK',
//     description: 'This guy is my teammate',
// }

// check();

var requestURL = 'http://localhost:8000/';

var xhr = new XMLHttpRequest();

xhr.open(GET, requestURL);