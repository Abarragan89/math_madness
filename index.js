$(document).ready(function() {
    //set timers and score
    $('#main_timer').text('30');
    $('#problem_timer').text('100');
    $('#score').text('0');
    $('#factor1').text("Let's");
    $('#factor2').text("GO!");
    $('#message').addClass('correct');
    $('#message').text("Good Luck!");

    $('#response').prop('disabled', 'true');
    $('#enter').prop('disabled', 'true');
    //Set score to 0
    let score = 0;

    //Get high score and display
    if (localStorage.getItem('highscore') === null){
        $('#highscore').text('0');
        $('#player').text('Name');
    } else {
        let highscore = localStorage.getItem('highscore');
        let player = localStorage.getItem('player');
        $('#highscore').text(highscore);
        $('#player').text(player);
    }

    //Start the game with new numbers
    function gameStart() {
        //Create random numbers and display them in span
        $('#enter').prop('disabled', false);
        $('#response').prop('disabled', false);

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
            incorrect();
            $('#message').removeClass('correct')
            $('#message').addClass('incorrect')
            $('#message').text('Incorrect');
            $('#response').val("");

        } else if (answer != response) {
            incorrect();
            $('#message').removeClass('correct')
            $('#message').addClass('incorrect')
            $('#message').text('Incorrect');
            $('#response').val("");

        //Correct Answer
        } else if (answer == response) {
            correctNoise()
            $('#message').removeClass('incorrect')
            $('#message').addClass('correct')
            $('#message').attr('color', 'green');
            $('#message').text('Correct!');

            //Determine Multiplier
            let multiplier = $('#problem_timer').text();
            multiplier = parseInt(multiplier);

            //Multiply multiplier by 10
            let points = 5 * multiplier;

            //add points to the score
            score += points;
            $('#score').text(score);

            //Set the span to '0' to trigger a reset in the problem timer
            $('#problem_timer').text("0");   
        }
    }

    //Set up a problem timer
    function problemTimer () {
            let sec = 100;
            $('#problem_timer').text("100");

            const proTimer = setInterval(function() {
            if ($('#problem_timer').text() == '0') {
                clearInterval(proTimer);
                gameStart();
                problemTimer();   
            //if main timer goes off
            } else if ($('#problem_timer').text() == 'Nice Try!') {
                clearInterval(proTimer);
            } else { 
            sec--;
            $('#problem_timer').text(sec);
            }
        }, 100)
    }   
    //checks the status of the problem timer to change color accordingly. 
    function problemTimerColor () {
        setInterval(function() {
            num = $('#problem_timer').text();
            num = parseInt(num);
            if (num > 61) {$('#problem_timer').css('color', 'white');}
            if (num < 50) {$('#problem_timer').css('color', 'red');}
            if (num == 0) {$('#problem_timer').css('color', 'white');}
        }, 1)
    }

    //Set up main timer
    function mainTimer() {
        let sec = 30;
        let timer = setInterval(function(){
            sec--;
            $('#main_timer').text(sec);
            //if the main timer is 10 seconds
            if ($('#main_timer').text() == 10) {
                tenSecondNoise();
            }
            //if the main timer reaches zero
            if ($('#main_timer').text() <= -0.4 ) {
                $('#main_timer').text("Time!")
                $('#problem_timer').css('color', 'green')
                $('#problem_timer').text('Nice Try!');
                $('#message').text("");
                $('#response').prop('disabled', 'true');
                $('#start').prop('disabled', 'true');
                $('#enter').prop('disabled', 'true');
                //set High Score
                setHighscore();
                clearInterval(timer);
            } else if ($('#main_timer').text() == "Done") {
                clearInterval(timer);
            }
        }, 1000);
    }

    //set highscore
    function setHighscore() {
        //check if there is a highscore. If not, set one
        if (localStorage.getItem('highscore') === null) {
            highscoreNoise();
            let name = prompt('New High Score!\nEnter your name.');
            if (name === null) {name = 'anonymous'}
            localStorage.setItem('highscore', score);
            localStorage.setItem('player', name);
            let newScore = localStorage.getItem('highscore');
            let newPlayer = localStorage.getItem('player')
            $('#highscore').text(newScore);
            $('#player').text(newPlayer);
            $('#message').text('Congratulations!')

        //If there is a highscore, see if current is bigger
        } else if (score > localStorage.getItem('highscore')) {
            highscoreNoise();
            $('problem_timer').text('Congratulations!')
            let name = prompt('New High Score!\nEnter your name.');
            if (name === null) {name = 'anonymous'}
            localStorage.setItem('highscore', score);
            localStorage.setItem('player', name);
            let newScore = localStorage.getItem('highscore');
            let newPlayer = localStorage.getItem('player')
            $('#highscore').text(newScore);
            $('#player').text(newPlayer);
            $('#message').text('Congratulations!')
        } else {
            $('#message').text('Try Again')
        }
    }

    //Reset the buttons and score for a new game. 
    function reset() {
        setHighscore()
        score = 0;
        $('#start').prop('disabled', false);
        $('#score').text('0');
        $('#main_timer').text('30');
        $('#problem_timer').text('Nice Try!')
    }

    //Reset highscore
    $('#reset_highscore').click(function () {
        localStorage.removeItem('highscore');
        localStorage.removeItem('player');
        $('#highscore').text('0');
        $('#player').text('Name');

    })

    //correct sound function
    function correctNoise() {
        if (O('correct').play()) {
            O('correct').pause();
            O('correct').currentTime = 0;
        }
        O('correct').play();
    }
    //Game over noise
    function gameOverNoise() {
        O('game_over').play();
    }
    //theme music
    function themeNoise() {
        O('theme').volume = 0.3;
        O('theme').play();
    }
    function incorrect() {
        if (O('incorrect').play()) {
            O('incorrect').pause();
            O('incorrect').currentTime = 0;
        }
        O('incorrect').play()
    }

    function highscoreNoise() {
        O('highscoreNoise').play()
    }
    
    function tenSecondNoise() {
        O('ten_second').play();
    }

    //button event  event handlers
    $('#enter').click(checker);

    $('#start').click(gameStart);
    $('#start').click(themeNoise);
    $('#start').click(problemTimer)
    $('#start').click(mainTimer);
    $('#start').click(problemTimerColor)

    $('#reset').click(reset);

    //Press enter to submit score in response
    $('#response').keyup(function(e) {
        if(e.keyCode == 13 || e.which == 13) {
            checker();
        }
    })
})