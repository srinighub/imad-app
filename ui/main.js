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
 
    
}