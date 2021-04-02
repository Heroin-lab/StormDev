var requestURL = 'http://localhost:8080/question';

var xhr = new XMLHttpRequest();

xhr.open('GET', requestURL);

xhr.onload = function() {
    console.log(JSON.parse(xhr.response));
}
xhr.send();