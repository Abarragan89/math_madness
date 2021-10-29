$(document).ready(function() {
    let score = 0;
    let reset = false;

    //pick a number
    function gameStart() {
        //Create random numbers and display them in span
        let random1 = Math.floor(Math.random() * 12) + 1;
        let random2 = Math.floor(Math.random() * 12) + 1;
        $('#factor1').text(random1);
        $('#factor2').text(random2);

        //Focus on text input
        $('#response').val("");
        $('#response').focus();
    }



    //function to check if the answer is correct. 
    function checker() {
        let factor1 = parseInt($('#factor1').text());
        let factor2 = parseInt($('#factor2').text());
        let answer = factor1 * factor2;
        let response = parseInt($('#response').val());

        if (isNaN(response)) {
            $('#message').text('You need to put a number.');
            $('#response').val("");

        } else if (answer != response) {
            $('#message').text('Sorry, try again');
            $('#response').val("");


        } else if (answer == response) {
            $('#message').text('You got it right!');

            //give the player their points and call gameStart()
            let multiplier = $('#problem_timer').text();
            multiplier = parseInt(multiplier);

            //multiply by 10
            let points = 10 * multiplier;

            //add points to the score
            score += points;
            $('#score').text(score);

            //Reset game and problem timer
            gameStart();
            reset = true;
            problemTimer();
            

        }
    }

    //Set up main timer
    function mainTimer(){
        let sec = 60;
        let mainTimer = setInterval(function(){
            $('#main_timer').text(sec);
            sec--;
            if (sec < 0) {
                clearInterval(mainTimer);

            }
        }, 1000);
    }


    //Set up a problem timer
    function problemTimer () {

            if (reset) {clearInterval(proTimer)};
            let sec = 10;
            const proTimer = setInterval(function(){
            $('#problem_timer').text(sec);
            sec--;
            if (sec < 0) {
                clearInterval(proTimer);
                gameStart();
                problemTimer();
            }
    
        }, 1000)
    }   


    //caculate score for each correct answer

    $('#enter').click(checker);
    
    $('#start').click(gameStart);
    $('#start').click(problemTimer)
    $('#start').click(mainTimer);

    //Press enter to submit score
    $('#response').keyup(function(e) {
        if(e.keyCode == 13 || e.which == 13) {
            checker();
        }
    })
})