
var highScore = document.querySelector("#highScore");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clear");

// event to clear scores from page
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// pulling data from local storage 
var listResults = localStorage.getItem("listResults");
listResults = JSON.parse(listResults);

// if statement to pull and show data
if (listResults !== null) {

    for (var i = 0; i < listResults.length; i++) {
        // in created li
        var createLi = document.createElement("li");
        createLi.textContent = listResults[i].initials + ": " + listResults[i].score + " points";
        highScore.appendChild(createLi);

    }
}
// event to take usr back to index.html
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});