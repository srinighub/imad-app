//API - Counter Code
window.onload=function()
{

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

//API - Capture Input Text

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

//Submit Comment
var submitComment = document.getElementById("submit_cmnt");

submitComment.onclick = function (){
    var articleName = document.getElementById("articleName");
    var articleComment = document.getElementById("articleComment");
    var readerName = document.getElementById("name").value;
    
    //Make the Request to send the value of Inputbox
    var request = XMLHttpRequest();
    
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            //On Successful execution get the response and store it in a variable
            if (request.status ==200){
                var ul = document.getElementById("commentList");
                ul.innerHTML = request.responseText;
            }
        }
    };
    
    //Make the request 
    var url = 'http://srinikrishnamoorthy.imad.hasura-app.io/articles/'+ articleName.value + '/submit-comment?name=' + readerName + '&comment=' + (articleComment.value).replace(/\n/g, '<br>');
    request.open("GET", url, true);
    request.send(null);
    articleComment.value = '';

};
}
