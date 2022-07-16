function myFunction() {
	var x = document.getElementById("Language");
	var i = x.selectedIndex;
	document.getElementById("selected-language").innerHTML="You have selected "+x.options[i].text;
  }
