

// variables declared
var StartClock = document.querySelector("#startClock");
var clock = document.querySelector("#clock");
var questionsBox = document.querySelector("#questionsBox");
var mainBox = document.querySelector("#mainBox");
var endGame = document.querySelector("#endGame")

// declaring starting score code = 0
let score = 0;
// declaring starting point for questionList 
let questionList = 0;

// setting array with questions (text of question, choices and the right answer) 
let Questions = [
    {   questionText: "Commonly used data types DO NOT include:",
        answerOptions: ["Strings", "Booleans", "Alerts", "Numbers"],
        rightAnswer: "Alerts"},
    
    {   questionText: "The condition in an if / else statement is enclosed within ___.",
        answerOptions: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
        rightAnswer: "Parentheses"},

    {   questionText: "Arrays in Javascript can be used to store ____.",
        answerOptions: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
        rightAnswer: "All of the above"},

    {   questionText: "String values must be enclosed within ___ when being assigned to variables.",
        answerOptions: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        rightAnswer: "Quotes"},

    {   questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answerOptions: ["Javascript", "Terminal / Bash", "For loops", "Console log"],
        rightAnswer: "Console log"},

];

// ------------------HERE WE PROGRAM THE TIMER ----------------------
// as a user i want to start the game by clicking the "start quiz" button which starts the clock
// when i click on function StartClock..
StartClock.addEventListener("click", function () {
    if (holdInterval === 0) {
            holdInterval = setInterval(function () {
            // timeleft counts down by 1 secs; and var clock - attached to div clock shows the string that visualizes "Time" + timeleft
            timeLeft--;
            clock.textContent = "Time: " + timeLeft;
            // if var timeLeft equals 0, then program clears timeLeft and runs the quizFinished function
            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                quizFinished();
            }
            // set to run every 1 second (1000ms)
        }, 1000);
    }
    render(questionList);
});


// creating new ul to show the question choices
var ulShowchoices = document.createElement("ul");
// setting var timeLeft and starting point of 80
var timeLeft = 100;
// setting var penalty, which is the penalty to be used for every wrong answer.
var penalty = 10;
var holdInterval = 0;





// -------------- HERE WE PROGRAM THE QUESTIONS AND ANSWERS 
// first question prompts you a set of choices; the choice you click on becomes your answer.
// function questionlist runs the questions by first clearing the questionsbox (attached to questionsbox id) and showing content by putting empty quotes in ulshowchoices (attached to id answersul in html)
function render(questionList) {
    questionsBox.innerHTML = "";
    ulShowchoices.innerHTML = "";
    // here we set loop that takes you from question 1 to question 2, question 3, question 4 and question 5
    for (var i = 0; i < Questions.length; i++) {
        var quizQuestions = Questions[questionList].questionText;
        // declaring variable quizchoices which is attached to the choices in the questions array on top
        var quizChoices = Questions[questionList].answerOptions;
        // here we tell system that we want the declared variable quizquestions to show in questionsbox in html
        questionsBox.textContent = quizQuestions;
    }
    
    // setting function for choices
    quizChoices.forEach(function (nextQuestion) {
        // setting new variable to create li element which will be the list of choices
        var choicesLi = document.createElement("li");
        // establishing that nextquestion will be equivalent to the text content in variable choicesli
        choicesLi.textContent = nextQuestion;
        // appending the child in var ulshowchoices attached to the created ul
        questionsBox.appendChild(ulShowchoices);
        // appending the li child of ulshowchoices (aka list of choices)
        ulShowchoices.appendChild(choicesLi);
        // once an li is clicked; then the function compare triggers
        choicesLi.addEventListener("click", (compare));
    })
}

// once answer is chosen, systems compares saved data and tells you if you got it right or wrong. system will also deduct 10 seconds if you got wrong answer. 
// function compare compares the data in the array saved and with the li clicked previously
function compare(event) {
    // setting var userchoice to invoke event resulted by a click and target 
    var userChoice = event.target;
    // if click occurs inside one of the li, then ....
    if (userChoice.matches("li")) {
        // created a div element and declared it as var newDiv
        var newDiv = document.createElement("div");
        // then declared that div as id newDiv 
        newDiv.setAttribute("id", "newDiv");
        // declaring if and else statements for comparison
        // comparing -> if the content inside userchoice matches the data type of the archived answers in the questions array, then  you got a correct answer
        if (userChoice.textContent == Questions[questionList].rightAnswer) {
            // increment operator added to score ... for every right answer, the score (#number of right answers) increments
            score++;
            // with correct answer, user gets text inside newDiv with message declaring correct answer 
            newDiv.textContent = "Correct answer. Great job!";
        } 
        // comparing --> if the content inside elements doesnt match the data type of an archive answer, then you got an incorrect answer
        else {
            // timeLeft (time of the moment a choice is selected) will append to a new version of the same variable minus the penalty value declared 
            timeLeft = timeLeft - penalty;
            // newDiv displays text to acknowledge answer is wrong
            newDiv.textContent = "Wrong answer";
        }
    }

    // system increments questionList to take user to next question 
    questionList++;

    // if questionList is larger or equal then its length, then all questions have been prompted and quizFinished runs
    if (questionList >= Questions.length) {
        quizFinished();
    } 
    
    // render questionList; records responde and takes code to next question
    else {
        render(questionList);
    }
    questionsBox.appendChild(newDiv);
}

// run function quizFinished 
function quizFinished() {
    mainBox.style.display="none";
    endGame.style.display="block";
// holding value of timeLeft to stop the clock
    if (timeLeft >= 0) {
        clearInterval(holdInterval);
    }

    // grabbing endScore id and adding text content with number of questions correct and final score
    document.getElementById("endScore").textContent="You got " + score + " out of " + Questions.length + " questions correct." + " Your final score is: " + timeLeft;
    // establishing event in save initials button
    document.getElementById("save").addEventListener("click", function(){
    // establishing var initials linked to input in html with id initials
    var initials = document.getElementById("initials");
    console.log("initials: " + initials + ", score: " + timeLeft);
    // establishing new var with the goal to link it to the value of initials 
    var initialsInput = document.querySelector("#initials");
    initials = initialsInput.value;
    
  // if statement to let user know initials need to be entered
    if (initials === null) {
    console.log("You need to enter your initials");
    } 
// if value is entered ...
    else {
    // establishing new var for future local storage
    var finalScores = {
        initials: initials,
        score: timeLeft
    }
    // calling new var to show values
    console.log(finalScores);
    // new variable to save records in local storage
    var listResults = localStorage.getItem("listResults");
    
    if (listResults === null) {
        listResults = [];
    } 
    // if records in local storage, then var listresults will be equal to json all scores recorded in local storage
    else {
        listResults = JSON.parse(listResults);
    }
    // pushing finalScores in listResults
    listResults.push(finalScores);
    // establishing new var to show stringify json from listResults 
    // stringResults is the stringify of listResults
    var stringResults = JSON.stringify(listResults);
    // localstorage name is listResults; stringResults is the variable that its grabbing
    localStorage.setItem("listResults", stringResults);
    // browser takes user to next html for high scores
    window.location.replace("./HighScores.html");
}
});

}


