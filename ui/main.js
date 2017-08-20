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
    }
    
    //Make the request 
    request.open("GET", "http://srinikrishnamoorthy.imad.hasura-app.io/counter", true);
    request.send();
 
    //Submit Name
    var nameInput = document.getElementById("name");
    var name = nameInput.value;
    var submit = document.getElementById("submit_btn");
    submit.onClick = function (){
        //Make the Request to send the value of Inputbox
        
        
        //capture the list of names and show it on the page
        var names = ['name1','name2','name3','name4'];
        var list = '';
        for (var i=0; i<=names.length; i++){
            list += '<li>'+ names[i] + '</li>';
        }
        var ul = document.getElementById("nameList");
        ul.innerHTML = list;
        
    }
    Capture Input Text
    
}