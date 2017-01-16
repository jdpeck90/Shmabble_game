var points = 0;
$(init);

function init() {
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
              console.log('maybe its this one?')
            $('.slots').on('click', function(div) {
                $(this).addClass('newChip')
                var addText = $( '<p>'+innerText+'</p>' )
                console.log(addText,'addText')
                console.log(div.currentTarget,'divClick')
                console.log(this,'thisClick')
                $( div.currentTarget ).append( $(addText) )
                innerText = ''
                e.currentTarget.remove()
            })
        })
        ////////////////*****CLICK TO MOVE FUNCTION -- NEW ELEMENT******////////////////////////
    $('div#test.letters').on('click', function(e) {
            var innerText = this.innerText
        $('.slots').on('click', function(div) {
                console.log(div,'div newClickFunc')
                console.log(e,'e newClickFunc')
                $(this).addClass('newChip')
                $( this ).append( $( '<p>'+innerText+'</p>' ) )
                console.log(this,'this newClickFunc')
                innerText = ''
                e.currentTarget.remove()
        })
    })


    ////////////////*****REPLENISH******////////////////////////
    var replenish = function() {
        var usedChips = $('.slots.newChip')
        alphabet.sort(function() {
            return Math.random() - .5
        });
        for (var i = 0; i < usedChips.length; i++) {
            $('<div class="letters">' + alphabet[i] + '</div>').attr('id', 'liveHand')
                .appendTo('#chipPile')
        }
    }


    ////////////////*****SUBMIT BUTTON******////////////////////////


    $("#button").click(function() {
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

            if (alphabet.indexOf(getTextRow[j].innerHTML) >= 0) {
                wordToScore.push(getTextRow[j].innerHTML)
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


    ////~~~~~~~IS It A Word?~~~~~~~~/////// -
    var isItAWord = function(word) {
      console.log(word,'isThisAWord?')


    }



    ////`~,~`~,~`GET TXT FILES`~,~`~,~`//////



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
      console.log(wordToScore,'WordToScore')
        ////---POINTS FOR WORD LENGTH---///////
        var wordLength = wordToScore.length;
        var $scoreDisplay = $('span#score')
        isItAWord(wordToScore)

        //////////---POINTS FOR WORD'S LETTERS---/////////////
        var splitWordUp = wordToScore.split('');

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
        console.log('totalPoints')

        $scoreDisplay[0].innerText = totalPoints;
    }

    //////////---TIMER---/////////////

    var intervalId;

    var countDown = function(){
      intervalId = setInterval(changeColors, 1000)
    }

    var changeColors = function() {
            var $countDown = $('#countDown')[0].innerText
            $('#countDown').css('color','#00FF00')
            if ($countDown > 75) {
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
        $('#countDown')[0].innerText = $countDown - 1;
    }

var stopTimer = function(){
  console.log('stopTimer Called')
  clearInterval(intervalId)
  $('#countDown')[0].innerText = 0
  console.log('timer = 0 & clearInterval')
}

    //////////---BEGINNING MESSAGE---/////////////

    var $begin = $('#begin')
    var $startGame = $('#startGame')

    $begin.on('click', function() {
        $startGame.hide()
        countDown()

    })

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



    callDictionary = function() {
        $.ajax({
                url:'https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=snoogle&pretty=true' ,
                method: 'GET'
            })
            .done(function(data) {
                if(data.tuc){
                  console.log(data.tuc.length, 'this works')
                  return "that's an actual word!"
                } else {
                  console.log('Thats not a word')
                  return "That's not a word"
                }
            })
            }


}
