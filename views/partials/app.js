var btn = document.querySelector("button");
var display = document.querySelector("#display");
btn.addEventListener("click", function(){
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      var n = JSON.parse(XHR.responseText);
      console.log(n.message);
      display.src = n.message;
    }
  };
  var url = "https://dog.ceo/api/breeds/image/random"
  XHR.open("GET", url);
  XHR.send();
})

