$(document).ready(function() {
    //Set score to 0
    let score = 0;

    //Get high score and display
    if(!localStorage.getItem('highscore')) {
        $('#highscore').text('High Score: ');

    } else {
        let highscore = localStorage.getItem('highscore');
        let highscorer = localStorage.getItem('name')
        $('#highscore').text(highscorer + " " + highscore)
    }

    //Start the game with new numbers
    function gameStart() {
        //Create random numbers and display them in span
        let random1 = Math.floor(Math.random() * 12) + 1;
        let random2 = Math.floor(Math.random() * 12) + 1;
        $('#factor1').text(random1);
        $('#factor2').text(random2);
        $('#start').prop('disabled', 'true');


        //Focus on text input
        $('#response').val("");
        $('#response').focus();
    }

    //function to check if the answer is correct. 
    function checker() {
        //Determine the product and response as number
        let factor1 = parseInt($('#factor1').text());
        let factor2 = parseInt($('#factor2').text());
        let answer = factor1 * factor2;
        let response = parseInt($('#response').val());

        //Compare the number and response
        if (isNaN(response)) {
            $('#message').removeClass('correct')
            $('#message').addClass('incorrect')
            $('#message').text('You need to put a number.');
            $('#response').val("");

        } else if (answer != response) {
            $('#message').removeClass('correct')
            $('#message').addClass('incorrect')
            $('#message').text('Incorrect');
            $('#response').val("");

        //Correct Answer
        } else if (answer == response) {
            $('#message').removeClass('incorrect')
            $('#message').addClass('correct')
            $('#message').attr('color', 'green');
            $('#message').text('Correct!');

            //Determine Multiplier
            let multiplier = $('#problem_timer').text();
            multiplier = parseInt(multiplier);

            //Multiply multiplier by 10
            let points = 10 * multiplier;

            //add points to the score
            score += points;
            $('#score').text(score);

            //Set the span to '0' to trigger a reset in the problem timer
            $('#problem_timer').text("0");   
        }
    }

    //Set up a problem timer
    function problemTimer () {
            let sec = 1000;
            $('#problem_timer').text("10.0");

            const proTimer = setInterval(function(){
            if (sec < 0 || $('#problem_timer').text() == '0') {
                clearInterval(proTimer);
                gameStart();
                problemTimer();

            //if main timer goes off
            } else if ($('#problem_timer').text() == 'Nice Try!') {
                clearInterval(proTimer);
            } else { 
            $('#problem_timer').text(sec);
            sec--;
            }
        }, 10)
    }   

    //Set up main timer
    function mainTimer(){
        let sec = 20;
        $('#main_timer').text("60")
        let timer = setInterval(function(){
            $('#main_timer').text(sec);
            sec--;
            if (sec < -1) {
                $('#main_timer').text("Time!")
                $('#problem_timer').text('Nice Try!');
                $('#message').text("");
                $('#response').prop('disabled', 'true');
                $('#start').prop('disabled', 'true');
                $('#enter').prop('disabled', 'true');
                clearInterval(timer);

                //set highscore
                if(score > highscore) {
                    score = highscore;
                    let name = prompt("New highscore!! Enter your name")
                    localStorage.setItem('highscore', score)
                    localStorage.setItem('name', name)
                }
            }
        }, 1000);
    }

    //Reset the buttons and score for a new game. 
    function reset() {
        score = 0;
        $('#start').prop('disabled', false);
        $('#enter').prop('disabled', false);
        $('#response').prop('disabled', false);
        $('#score').text('');
    }

    //Reset highscore
    $('#reset_highscore').click(function () {
        localStorage.removeItem('highscore');
        localStorage.removeItem('name');
    })

    //button event  event handlers
    $('#enter').click(checker);
    $('#start').click(gameStart);
    $('#start').click(problemTimer)
    $('#start').click(mainTimer);
    $('#reset').click(reset);

    //Press enter to submit score
    $('#response').keyup(function(e) {
        if(e.keyCode == 13 || e.which == 13) {
            checker();
        }
    })
})