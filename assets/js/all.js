document.addEventListener('DOMContentLoaded', function() {
  new Konami(() => {
    var elements = document.getElementsByClassName("hide");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = window.getComputedStyle(elements[i])["display"] === "none" ? "initial" : "none";
    }
  })
});