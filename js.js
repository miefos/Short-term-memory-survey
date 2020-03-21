//
// Initializations
//
let numOfDigits = [4, 6, 8];
let numbers = initializeNumbers();
let currentExercise = 0;
let maxExercise = numbers.length;
let resultArray = [];
let resultDigits = [];

function initializeNumbers() {
    let returnVal = [];
    for (let i = 0; i < numOfDigits.length; i++) {
        returnVal.push(generateRandomDigits(numOfDigits[i]));
    }
    return returnVal;
}

//
// Event handlers
//
$("#start").on("click", function () {
    $("#intro").hide();
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
        showExercise();
    } else {
        showResult();
    }
    return false;
});


//
// Functions
//
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
    }, 1500)
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
        totalCorrect += resultArray[i];
        total += numOfDigits[i];
    }
    let resultString = totalCorrect + "/" + total;
    resultDiv.append("<b>Total result: " + resultString + "</b> <br />");
    resultDiv.append("Your ID is: <b>" + calcID(resultString) + "</b>");
}

function calcID(resultString) {
    return ("jm34uztb" + Number(resultString.split("/")[0]).toString(30) + "dz" + Number(resultString.split("/")[1]).toString(30) + "fxo873j").toUpperCase();
}


// Random number generator
function generateRandomDigits(numOfDigits) {
    let returnVal = "";
    for (let i = 0; i < numOfDigits; i++) {
        let num = Math.floor((Math.random() * 10)); // Random from 0 to 10
        returnVal += num;
    }
    return returnVal;
}
