var isIE8;
var invocation;
var url;
var city;

/*
function getData(){
    if ( window.event.which === 13 || window.event.keyCode === 13 ) { // 13 is enter
      // code for enter
		var city = document.getElementById("name").value;
		isIE8 = window.XDomainRequest ? true : false;
		invocation = createCrossDomainRequest();
		url = 'http://www.rdrt.in/weatherData.php?city='+city;
		callOtherDomain();
    }
});
*/

document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  	checkPageButton.addEventListener('click', function() {
		chrome.tabs.getSelected(null, function(tab){
			city = document.getElementById("city").value;
			isIE8 = window.XDomainRequest ? true : false;
			invocation = createCrossDomainRequest();
			url = 'http://www.rdrt.in/weatherData.php?city='+city;
			callOtherDomain();
		});
	}, false);
}, false);

$(document).on('keypress', function(e) {
    //13 maps to the enter key
    if ( e.which == 13 || e.keyCode == 13 ) {
        isIE8 = window.XDomainRequest ? true : false;
		invocation = createCrossDomainRequest();
		city = document.getElementById("city").value;
		url = 'http://www.rdrt.in/weatherData.php?city='+city;
		callOtherDomain();
    }
});

  function createCrossDomainRequest(url, handler) {
    var request;
    if (isIE8) {
      request = new window.XDomainRequest();
      }
      else {
        request = new XMLHttpRequest();
      }
    return request;
  }

  function callOtherDomain() {
    if (invocation) {
      if(isIE8) {
        invocation.onload = outputResult;
        invocation.open("GET", url, true);
        invocation.send();
      }
      else {
        invocation.open('GET', url, true);
        invocation.onreadystatechange = handler;
        invocation.send();
      }
    }
    else {
      var text = "No Invocation TookPlace At All";
      var textNode = document.createTextNode(text);
      var textDiv = document.getElementById("feed");
      textDiv.appendChild(textNode);
    }
  }

  function handler(evtXHR) {
    if (invocation.readyState == 4)
    {
      if (invocation.status == 200) {
          outputResult();
      }
      else {
        alert("Invocation Errors Occured");
      }
    }
  }

  function outputResult() {
    var response = invocation.responseText;
    var textDiv = document.getElementById("feed");
	textDiv.style.height= "180px";
    textDiv.style.width= '180px';
    textDiv.innerHTML = response;
  }