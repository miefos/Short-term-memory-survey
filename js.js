//
// Initializations
//
let custom = false;
let sample = false;
let firstExercise = true;
let numOfDigits = [4,5,6,6,7,7,8,8,8,9,9,10];
let startingTime = 0.8;
let increasePerLevelTime = 0.2;
let timeForEach = initTime(startingTime, increasePerLevelTime);
let numbers = initializeNumbers();
let currentExercise = 0;
let maxExercise = numbers.length;
let resultArray = [];
let resultDigits = [];
let showGetReadyForMiliseconds = 1001;

populateDescription();

function populateDescription() {
    $("#increaseTime").html(increasePerLevelTime);
    $("#startingTime").html(startingTime);
    $("#numOfDigitsInfoMin").html(Math.min.apply(Math, numOfDigits));
    $("#numOfDigitsInfoMax").html(Math.max.apply(Math, numOfDigits));
    $("#numOfExercises").html(numOfDigits.length);
    $("#descriptionAboutExercises").show();
}

function initializeNumbers() {
    let returnVal = [];
    for (let i = 0; i < numOfDigits.length; i++) {
        returnVal.push(generateRandomDigits(numOfDigits[i]));
    }
    return returnVal;
}

function initTime(starting, perLevel) {
    let returnVal = [];
    for (let i = 0; i < numOfDigits.length; i++) {
        if (i < 5) {
            returnVal.push(starting + perLevel * i);
        } else {
            returnVal.push(starting + perLevel * i * 2);
        }
    }
    return returnVal;
}

//
// Event handlers
//
$("#start").on("click", function () {
    $(".intro").hide();
    startTheTest();

    return false;
});

function startTheTest() {
    let msecLeft = showGetReadyForMiliseconds;
    $("#getReady").show();
    $("#answerSheet").hide();
    showGetReady(msecLeft);
    msecLeft-=1000;
    let ccc = setInterval(function() {
        showGetReady(msecLeft);
        if (msecLeft <= 0) {
            $("#getReady").hide();
            $("#test").show();
            showExercise();
            clearInterval(ccc);
            firstExercise = false;
        }
        msecLeft-=1000;
    }, 1000);

}

$("#startSample").on("click", function () {
    custom = true;
    sample = true;

    numOfDigits = [2, 4, 6];
    timeForEach = [1, 1, 1];

    numbers = initializeNumbers();
    maxExercise = numbers.length;

    let msecLeft = showGetReadyForMiliseconds;
    $(".intro").hide();
    $("#getReady").show();
    startTheTest();

    return false;
});

$("#startAdmin").on("click", function () {
    custom = true;
    // Initialize values
    numOfDigits = [];
    timeForEach = [];
    let numOfDigitsFromInput = $("#numDig").val().trim();
    let timeForEachFromInput = $("#numTime").val().trim();
    numOfDigits = numOfDigitsFromInput.split(",");
    timeForEach = timeForEachFromInput.split(",");

    numbers = initializeNumbers();
    maxExercise = numbers.length;


    $(".intro").hide();
    $("#test").show();
    showExercise();
    return false;
});


$("#answerSheetForm").on("submit", function (e) {
    let answer = $("#answerInput").val();
    let result = calculateResult(answer);
    resultArray.push(result);
    resultDigits.push({
        "correct": numbers[currentExercise],
        "answer": answer
    });
    currentExercise++;
    if (currentExercise < maxExercise) {
        startTheTest();
    } else {
        showResult();
    }
    return false;
});


//
// Functions
//
function showGetReady(secs) {
    if (firstExercise) {
        $("#getReady").html("Get Ready for the Test... " + Math.ceil(secs / 1000));
    } else {
        $("#getReady").html("Exercise " + (currentExercise + 1) + " ... " + Math.ceil(secs / 1000));
    }
}


function showExercise() {
    // Hide answer sheet
    $("#answerSheet").hide();

    // Show exercise
    $("#Exercise").show();
    $("#Exercise h2").html(numbers[currentExercise]);

    // Timeout to hide exercise
    setTimeout(function () {
        $("#Exercise").hide();
        showAnswerSheet(numbers[currentExercise].length)
    }, timeForEach[currentExercise]*1000)
}


function showAnswerSheet(numOfDigits) {
    let answerInput = $("#answerInput");
    answerInput.val("");
    answerInput.attr("maxlength", numOfDigits);
    $("#numOfDigits").text(numOfDigits);
    $("#answerSheet").show();
    answerInput.focus();
}


function calculateResult(answerDigits) {
    let correct = 0;
    for (let i = 0; i < numbers[currentExercise].length; i++) {
        if (numbers[currentExercise][i] === answerDigits[i]) {
            correct++;
        }
    }
    return correct;
}


function showResult() {
    let resultDiv = $("#result");
    $("#answerSheet").hide();
    $("#Exercise").hide();
    resultDiv.show();
    //console.log(resultArray);
    let totalCorrect = 0;
    let total = 0;
    for (let i = 0; i < resultArray.length; i++) {
        // Show each exercise result
        resultDiv.append("<b>Exercise " + (i + 1) + " result is " + resultArray[i] + "/" + numOfDigits[i]  + ".</b> Pattern was: " + resultDigits[i]["correct"] + " You answered: " + resultDigits[i]["answer"] + "<br />");
        // Add to total result
        totalCorrect += parseInt(resultArray[i]);
        total += parseInt(numOfDigits[i]);
    }
    let resultString = totalCorrect + "/" + total;
    resultDiv.append("<b>Total result: " + resultString + "</b> <br />");
    if (!custom) {
        $("#googleFormsIframe").attr("src", "https://docs.google.com/forms/d/e/1FAIpQLSezcjBmWxGdiYZvbwxR-yjf_zaxbMauHvn6g-5WwO3ADbR9dw/viewform?entry.2005620554=" + calcID(resultString));
        $("#googleFormsIframeWrap").show();
        // resultDiv.append("Your ID is: <b>" + calcID(resultString) + "</b>");
    }
    if (sample) {
        resultDiv.append("<a href=\"https://miefos.github.io/Short-term-memory-survey\"><button id=\"backToMain\" type=\"submit\" class=\"btn btn-primary\">Back to main page</button></a>");
    }
}

function calcID(resultString) {
    return ("jm34" + Number(resultString.split("/")[0]).toString(30) + "dz" + Number(resultString.split("/")[1]).toString(30) + "fj").toUpperCase();
}


// Random number generator
function generateRandomDigits(numOfDigits) {
    let returnVal = "";
    for (let i = 0; i < numOfDigits; i++) {
        let num;
        do {
            num = Math.floor((Math.random() * 10)); // Random from 0 to 9
        } while ((num === parseInt(returnVal[i-1]) && num === parseInt(returnVal[i-2]) && numOfDigits > 7) ||
                (num === parseInt(returnVal[i-1]) && numOfDigits <= 7));
        returnVal += num;
    }
    return returnVal;
}
