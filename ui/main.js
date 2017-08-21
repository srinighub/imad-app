//Submit Comment 
var submitComment = document.getElementById("submit_cmnt");
if (submitComment){
	submitComment.onclick = function (){
		var articleName = document.getElementById("articleName");
		var articleComment = document.getElementById("articleComment");
		var readerName = document.getElementById("name").value;
		
		//Make the Request to send the value of Inputbox
		var request = new XMLHttpRequest();
		
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
		var url = window.location.origin + '/articles/'+ articleName.value + '/submit-comment?name=' + readerName + '&comment=' + (articleComment.value).replace(/\n/g, '<br>');
		request.open("GET", url, true);
		request.send(null);
		articleComment.value = '';

	};
};
//API - Counter Code

var button = document.getElementById("counter");
if (button){
	button.onclick = function () {
		//Create a request to the counter endpoint
		var request = new XMLHttpRequest();
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
		request.open("GET", window.location.origin + "/counter", true);
		request.send();
	};
};

//API - Capture Input Text

//Submit Name
var submit = document.getElementById("submit_btn");
if (submit){
	var nameInput = document.getElementById("name");
	submit.onclick = function (){
		//Make the Request to send the value of Inputbox
		var request = new XMLHttpRequest();
		
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
		request.open("GET", window.location.origin + '/submit-name?name=' + nameInput.value, true);
		request.send(null);
		nameInput.value = '';

	};
};



