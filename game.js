pattern=["red","blue","green","yellow"];
userInput=[];
gamePattern=[];
level=0;

$(document).on("keydown",function(){
    nextSequence();
    $(document).off("keydown");
});

function nextSequence(){
    var randomNum=Math.floor(Math.random()*4);
    gamePattern.push(pattern[randomNum]);
    $("#"+pattern[randomNum]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(pattern[randomNum]);
    level=level+1;
    $("h1").text("Level "+level);
}

$(".btn").click(function(){
    userInput.push($(this).attr("id"));
    printAlert(userInput.length-1);
    playSound($(this).attr("id"));
    addButtonAnimation($(this).attr("id"))
})

function printAlert(userLength){
    if(gamePattern[userLength]===userInput[userLength]){
        if(userInput.length===gamePattern.length){
            console.log("User Input "+userInput);
            userInput=[];
            nextSequence();
        }   
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");},200);
        restartGame();
    }
} 

function addButtonAnimation(currentId){
    $("."+currentId).addClass("pressed");
    setTimeout(function(){$("."+currentId).removeClass("pressed");},100);
}

function playSound(currentId){
    var mySound=new Audio("sounds/"+currentId+".mp3");
    mySound.play();
}

function restartGame(){
    userInput=[];
    gamePattern=[];
    level=0;
    $(document).on("keydown",function(){
        nextSequence();
        $(document).off("keydown");
    });
}