let numbers = [generateRandomDigits(4), // Not used currently but needed
              generateRandomDigits(6),
              generateRandomDigits(7),
              generateRandomDigits(10)];
let currentExercise = 0;
let maxExercise = numbers.length;
let resultArray = [];
let resultDigits = [];



$("#startForm").on("submit", function () {
    console.log("Starting...");
    let participantID = $("#participantIDInput").val();
    console.log(participantID);
    $("#intro").hide();
    $("#test").show();
    initFirstExercise(participantID);
    return false;
});

$("#answerSheetForm").on("submit", function (e) {
    let answer = $("#answerInput").val();
    let currentDigits = numbers[currentExercise];
    console.log("Submitted... (Exercise " + currentExercise + " with answer " + answer + "... correct is " + currentDigits + ")");
    resultDigits.push({
        "correct": numbers[currentExercise],
        "answer": answer
    });
    let result = calculateResult(currentDigits, answer);
    let resultString = result + "/" + currentDigits.length
    console.log("Result: " + resultString);
    resultArray.push(resultString);
    console.log(resultArray);
    $("#Exercise").hide();
    currentExercise++;
    console.log("Current exercise " + currentExercise + " from " + maxExercise + " exercises.");
    $("#answerSheet").hide();
    if (currentExercise < maxExercise) {
        showExercise();
        setTimeout(function () {
            $("#Exercise").hide();
            showAnswerSheet(currentDigits.length)
        }, 1500)
    } else {
        showResult();
    }
    return false;
});

function calculateResult(correctDigits, answerDigits) {
    let correct = 0;
    for (let i = 0; i < correctDigits.length; i++) {
        if (correctDigits[i] == answerDigits[i]) {
            correct++;
        }
    }
    return correct;
}

function initFirstExercise(participantID) {
    $("#participantId").html("<b>ID: </b>" + participantID);
    currentExercise += 1
    showExercise();
    setTimeout(function () {
        $("#Exercise").hide();
        showAnswerSheet(numbers[currentExercise].length)
    }, 1500)
}

function showResult() {
    $("#Exercise").hide();
    $("#result").show();
    //console.log(resultArray);
    let totalCorrect = 0
    let total = 0
    for (let i = 0; i < resultArray.length; i++) {
        // Show each exercise result
        $("#result").append("<b>Exercise " + (i + 1) + " result is " + resultArray[i] + ".</b> Correct was: " + resultDigits[i]["correct"] + " You answered: " + resultDigits[i]["answer"] + "<br />");
        // Add to total result
        let res = resultArray[i].split("/"); // 0th element is correctly answered, 1th element is total digits
        totalCorrect += parseInt(res[0]);
        total += parseInt(res[1]);
    }
    $("#result").append("<b>Total result: " + totalCorrect + "/" + total) + "</b>";
}

function showExercise() {
    $("#Exercise").show();
    $("#Exercise h2").html(numbers[currentExercise]);
}

function showAnswerSheet(numOfDigits) {
    $("#answerInput").val("");
    $("#numOfDigits").text(numOfDigits);
    $("#answerInput").attr("maxlength", numOfDigits);
    $("#answerSheet").show();
    $("#answerInput").focus();
}


function generateRandomDigits(numOfDigits) {
    let returnVal = ""
    for (let i = 0; i < numOfDigits; i++) {
        let num = Math.floor((Math.random() * 10)); // Random from 0 to 10
        returnVal += num;
    }
    return returnVal;
}
