var points = 0;
$(init);

function init() {
  ////////////////*****CHOOSE DIFFICULTY******////////////////////////


$('span button.easyButton').click(function() {
  $('#countDown')[0].innerText = 300
  $('#target')[0].innerText = 75
$('div#startMenu').hide()
$('#shmabbleGame').show()
$('#gameOver').hide()
timer()
$('body').css('background-color','grey')

});

$('span button.mediumButton').click(function() {
  $('#countDown')[0].innerText = 150
  $('#target')[0].innerText = 150
$('div#startMenu').hide()
$('#shmabbleGame').show()
timer()
$('body').css('background-color','grey')

});

$('span button.hardButton').click(function() {
  $('#countDown')[0].innerText = 75
  $('#target')[0].innerText = 250
$('div#startMenu').hide()
$('#shmabbleGame').show()
timer()
$('body').css('background-color','grey')

});

    var createDeck = function() {
        // Create the pile of shuffled cards
        alphabet = [
            'A', 'A', 'B', 'C', 'D', 'E', 'E', 'F',
            'G', 'H', 'I', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ]
        alphabet.sort(function() {
            return Math.random() - .5
        });

        for (var i = 0; i < 10; i++) {
            $('<div>' + alphabet[i] + '</div>').attr('id', 'liveHand').addClass('letters')
                .appendTo('#chipPile')
        }
    }
    createDeck()


    // Create the card slots

    for (var i = 1; i <= 121; i++) {
        $('<div>' + " " + '</div>').attr('id', 'cell').attr('id', 'cell' + i).addClass('slots').appendTo('#cardSlots')
    }

    $('#submit').on('click', function() {
        scoreWord(jointArray)
        replenish()
    }, false);


    ////////////////*****CLICK TO MOVE FUNCTION******//////////////////////// -- Decrease font-size of the element before it's moved to the game board.
    $('div#liveHand').on('click', function(e) {
            var innerText = this.innerText
            console.log('innerText')
            $('.slots').on('click', function(div) {
                $(this).addClass('newChip')
                console.log(this,'this')
                var addText = $( '<p>'+innerText+'</p>' )
                console.log(addText,'addText')
                $( div.currentTarget ).append( $(addText) )
                innerText = ''
                e.currentTarget.remove()
            })
        })
        ////////////////*****CLICK TO MOVE FUNCTION -- NEW ELEMENT******////////////////////////
    // $('div#liveHand').on('click', function(e) {
    //         var innerText = this.innerText
    //     $('.slots').on('click', function(div) {
    //             $(this).addClass('newChip')
    //             var addText = $( '<p>'+innerText+'</p>' )
    //             $( div.currentTarget ).append( $(addText) )
    //             innerText = ''
    //             e.currentTarget.remove()
    //     })
    // })


    ////////////////*****REPLENISH******////////////////////////

    var replenish = function() {
        var usedChips = $('.slots.newChip')
        alphabet.sort(function() {
            return Math.random() - .5
        })
        for (var i = 0; i < usedChips.length; i++) {
            $('<div id="liveHand">' + alphabet[i] + '</div>').attr('class', 'letters')
                .appendTo('#chipPile')
        }
    }


    ////////////////*****SUBMIT BUTTON******////////////////////////


    $(".playChips").click(function() {
        var getText = $('div.slots.newChip')
        if ($('div#cell61.slots')[0].innerHTML === " ") {
            alert('You must start in the center')
            for (var v = 0; v < getText.length; v++) {
               $('<div class="letters">' + getText[v].innerText + '</div>').attr('id', 'liveHand')
                    .appendTo('#chipPile')
                getText[v].innerText = ' '
            }
            return;
        }
                var wordToEval = '';
                extractSequence(getText)
          for(var c = 0; getText.length > c; c++ ){
            wordToEval += getText[c].innerText
          }
        replenish()
        checkScore()
        $('div.newChip').removeClass('newChip')


        $('div#liveHand.letters').on('click', function(e) {
            var innerText = this.innerText
            $('.slots').on('click', function(div) {
                $(this).addClass('newChip')
                div.toElement.innerText = innerText;
                e.currentTarget.remove()



            })
        })
    });

    var extractSequence = function(sequence){
      var numArray = [];
      for(var i = 0; i < sequence.length; i++){
        var num = sequence[i].id
        var numberPattern = /\d+/g;
       var seperatedNum = num.match( numberPattern )
       numArray.push(seperatedNum.join(""))
      }
      checkSequence(numArray,sequence)
    }

    var checkSequence = function(numbers,cells){
      var amountOfNums = numbers.length;
      for(var i = 0; i < amountOfNums-1; i++){
       var difference =  Math.abs(numbers[i] - numbers[i+1])
       if(difference === 11 || difference === 1){
        } else {
          alert('All of your newly plaid chips need to be in sequence')
          replaceCells(cells)
        }
    }
  }
    var replaceCells = function(cells){
      for(var i = 0; i < cells.length; i++){
        cells[i].innerText = "";
      }
    }
    var checkScore = function() {
        getPoints(getScore())
    }


    ////////////////*****CHECK ROWS*****////////////////////////
    var wordToScore = [];
    var getScore = function() {
        var getTextRow = $('div.slots.newChip')
        for (var j = 0; j < getTextRow.length; j++) {
            if (alphabet.indexOf(getTextRow[j].innerText) >= 0) {
                wordToScore.push(getTextRow[j].innerText)
            }
        }
        getTextRow.removeClass('newChip')
        return wordToScore.join("")
    }


    ////////////////*****CHECK COLOUMNS*****////////////////////////
    var wordToScoreColoumn = [];
    var checkColoumns = function() {
        for (var i = 1; i < 12; i++) {
            var coloumnNavigater = i;

            for (var j = 0; j < 11; j++) {
                var getTextColoumn = $('div#cell' + coloumnNavigater)

                if (alphabet.indexOf(getTextColoumn[0].innerHTML) >= 0) {
                    wordToScoreColoumn.push(getTextColoumn[0].innerHTML)
                }
                coloumnNavigater += 11;
            }
        }
        return wordToScoreColoumn.join("")
    }




    ///////////##############--WRONG WORD--##################//////

    var wrongChips = $('div.slots.newChip')
    for (var i = 0; i < wrongChips.length; i++) {
        $('div.slots.newChip')[i];
    }

    $('div.slots.newChip').appendTo($('div#chipPile'))

    ////////////////*****POINTS*****////////////////////////

    var onePoint = ['A', 'E', 'I', 'K', 'L', 'N', 'O', 'B', 'M']
    var twoPoints = ['U', 'S', 'Y', 'R']
    var threePoints = ['C', 'D', 'T', 'F', ]
    var fourPoints = ['F', 'G', 'W']
    var eightPoints = ['J', 'Q', 'H', 'V']
    var tenPoints = ['Z', 'P', 'X', 'Y']
    var totalPoints = 0;

    var getPoints = function(wordToScore) {
        ////---POINTS FOR WORD LENGTH---///////
        var wordLength = wordToScore.length;
        isItAWord(wordToScore)
}
        //////////---POINTS FOR WORD'S LETTERS---/////////////
    var calcPoints = function(word){
        var splitWordUp = word.split('');
        var wordLength = word.length;
        var $scoreDisplay = $('span#score')

        for (var i = 0; i < splitWordUp.length; i++) {
            var eachLetter = splitWordUp[i]
            console.log()
            if (onePoint.indexOf(eachLetter) !== -1) {
                totalPoints += 1;
            } else if (twoPoints.indexOf(eachLetter) !== -1) {
                totalPoints += 2;
            } else if (threePoints.indexOf(eachLetter) !== -1) {
                totalPoints += 3;
            } else if (fourPoints.indexOf(eachLetter) !== -1) {
                totalPoints += 4;
            } else if (eightPoints.indexOf(eachLetter) !== -1) {
                totalPoints += 8;
            } else if (tenPoints.indexOf(eachLetter) !== -1) {
                totalPoints += 10;
                console.log('tenPoints Works!')
            } else {
                totalPoints += 1;
            }
        }
        totalPoints += wordLength;
        console.log(totalPoints,'totalPoints')

        $scoreDisplay[0].innerText = totalPoints;
    }

    //////////---TIMER---/////////////

    var timer = function() {
    setInterval(function(){
      changeColors()
      minusSecond()
    }, 1000);
    }

  var minusSecond = function() {
            var $countDown = $('#countDown')[0].innerText
            if ($countDown > 0) {
                $('#countDown')[0].innerText = $countDown - 1;
            }
            if ($countDown <= 0) {
                endGame()
                $('#countDown')[0].innerText = 0
            }
            changeColors()
  }

    var changeColors = function() {
      var $countDown = $('#countDown')[0].innerText
            if ($countDown > 75) {
              $('#countDown').css('color','#00FF00')
            } else if ($countDown > 25) {
              $('#countDown').css('color','#FFFF00')
            } else if (25 > $countDown) {
              $('#countDown').css('color','#ff1111')
              if ( $countDown <= 0){
                console.log('timer-call')
                endGame()
                stopTimer()
                console.log('timer-functions-called')
                return $('#countDown')[0].innerText = 0
            }
          }
    }

var stopTimer = function(){
  console.log('stopTimer Called')
  clearInterval(intervalId)
  $('#countDown')[0].innerText = 0
  console.log('timer = 0 & clearInterval')
}

    //////////---CLEARBOARD---/////////////
    var clearBoard = function() {
            $('span#countDown')[0].innerHTML = 150
            var divAmount = $('div.slots')
            for (var i = 0; i < divAmount.length; i++) {
                divAmount[i].innerHTML = " ";
            }
            $('span#score')[0].innerText = "0"
        }
    //////////---END GAME---/////////////

    var endGame = function() {
        var gameOver = $('#gameOver')
        var $restartButton = $('#restartGame')
        var counter = 1;
        var elementLoop = 0
        var $score = $('#score' + counter)
        gameOver.css('visibility', 'visible')
        $('input#restartGame').click(function() {
          console.log('restartGame')
            if ($score[elementLoop].innerHTML === "0") {
                $scoreInput = $('#score')[0].innerText;
                $score[0].innerHTML = $scoreInput;
            } else {
                counter++
                $scoreInput = $('#score')[0].innerText;
                score[0].innerHTML = $scoreInput;
            }
            $('div#liveHand.letters').remove()


            clearBoard()
            createDeck()
            makeClickable()
            $('div#gameOver').hide()
            countDown()

        })
    }


    var makeClickable = function() {
        $('div#liveHand').on('click', function(e) {
            var innerText = this.innerText

            $('.slots').on('click', function(div) {
              console.log(div,'makeClickable')
                $(this).addClass('newChip')
                div.toElement.innerText = innerText;
                e.currentTarget.remove()
            })
        })
    }

    // AJAX CALLS
 ////~~~~~~~IS It A Word?~~~~~~~~/////// -
    var isItAWord = function(word) {


        $.ajax({
                url:'https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=' + word + '&pretty=true' ,
                method: 'GET'
            })
            .done(function(data) {
              console.log(data,'data')
                if(data.tuc){
                 calcPoints(word)
                } else {
                  alert("That's not a word!")
                  replenish()
                }
            })
      }
  }

