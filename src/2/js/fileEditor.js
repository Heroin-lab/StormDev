
var createQuestion = document.querySelector('.popup__modal-button1');

createQuestion.addEventListener('click', questionCreate);

function postReq(body) {
    return new Promise(function(resolve,reject){
        xhr.open('POST', requestURL + 'add');
        xhr.onload = function(){
          return resolve(xhr.responseText);
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(body ));    
    });
}


function questionCreate() {
    var data = {
        id: 8,
        theme: "New",
        quesText: "New ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, fuga consectetur itaque architecto blanditiis dolore ab quo iure laudantium nostrum, nam excepturi magni officia ex exercitationem illo. Deleniti, esse nam?",
        correctAnsw: false,
    }
    postReq(data);
}