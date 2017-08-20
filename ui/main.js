//Counter Code

var button = document.getElementById("counter");
button.onclick = function () {
    //Create a request to the counter endpoint
    var request = XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            //On Successful execution get the response and store it in a variable
            if (request.status ==200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
    };
    //Make the request 
    request.open("GET", "http://srinikrishnamoorthy.imad.hasura-app.io/counter", true);
    request.send();
};

//Capture Input Text

//Submit Name
var nameInput = document.getElementById("name");
var submit = document.getElementById("submit_btn");

submit.onclick = function (){
    //Make the Request to send the value of Inputbox
    var request = XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            //On Successful execution get the response and store it in a variable
            if (request.status ==200){
                var names = [];
                names = JSON.parse(request.responseText);
                var list = '';
                //capture the list of names and show it on the page
                for (var i=0; i<names.length; i++){
                    list = list + '<li>'+ names[i] + '</li>';
                }
                var ul = document.getElementById("nameList");
                ul.innerHTML = list;
            }
        }
    };
    
    //Make the request 
    request.open("GET", 'http://srinikrishnamoorthy.imad.hasura-app.io/submit-name?name=' + nameInput.value, true);
    request.send(null);
    nameInput.value = '';

};
