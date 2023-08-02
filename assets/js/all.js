const easterEgg = new Konami(() => {
    var elements = document.getElementsByClassName("hide");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = elements[i].style.display === "none" ? "initial" : "none";
    }
  })