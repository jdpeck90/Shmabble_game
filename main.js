var points = 0;
var scoreCounter = 1;
$(init);

function init() {
 console.log("-------POINTS-----------")
console.log("If points aren't coming up you might need to put CORS on.")

  ////////////////*****CHOOSE DIFFICULTY******////////////////////////
$('span button.easyButton').click(function() {
  countDownInit = 300
  $('#countDown')[0].innerText = countDownInit
  $('#target')[0].innerText = 50
    resetGame()
});

$('span button.mediumButton').click(function() {
   countDownInit = 150
  $('#countDown')[0].innerText = countDownInit
  $('#target')[0].innerText = 125
    resetGame()
});

$('span button.hardButton').click(function() {
    countDownInit = 75
  $('#countDown')[0].innerText = countDownInit
  $('#target')[0].innerText = 200
    resetGame()
});

var resetGame = function(){
  $('div#startMenu').hide()
  $('#shmabbleGame').show()
  $('#centerColumn').show()
  $('#leftColumn').show()
  $('#gameOver').hide()
  timer()
  $('body').css('background-color','grey')
}

    var playedWords = [];
    var playedSquares = [];
    var round = 0;
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
        $('<div><p>' + " " + '</p></div>').attr('id', 'cell').attr('id', 'cell' + i).addClass('slots').appendTo('#cardSlots')
    }

    $('#submit').on('click', function() {
        scoreWord(jointArray)
        replenish()
    }, false);



    ////////////////*****CLICK TO MOVE FUNCTION******//////////////////////// -- Decrease font-size of the element before it's moved to the game board.
    $(document).on('click','div#liveHand',function(e){
            var innerText = this.innerText
            $('.slots').on('click', function(div, b) {
              var pTag = div.currentTarget.firstChild
              pTag.innerText = innerText;
              $(pTag).addClass('newChip')
                e.currentTarget.remove()
            })
        })

    ////////////////*****REPLENISH******////////////////////////

    var replenish = function() {
        var usedChips = $('p.newChip')
        console.log('replenish - begininng')
        console.log(usedChips,'usedChips')
        for (var i = 0; i < usedChips.length; i++) {
          if(usedChips[i].innerText.length > 0) {
            $('<div class="letters">' + alphabet[Math.floor(Math.random()*alphabet.length)] + '</div>')
                .attr('id', 'liveHand')
                .appendTo('#chipPile')
        }
      }
        console.log('replenish - End')
    }


    ////////////////*****SUBMIT BUTTON******////////////////////////


    $(".playChips").click(function(a,b) {
        var getText = $('p.newChip')
        var textArray = []
        if ($('div#cell61.slots')[0].innerHTML === " ") {
            alert('You must start in the center')
            for (var v = 0; v < getText.length; v++) {
                if(getText[v].innerText.length > 0) {
                  textArray.push(getText[v])
               $('<div class="letters">' + getText[v].innerText + '</div>')
                    .attr('id', 'liveHand')
                    .appendTo('#chipPile')
                getText[v].innerText = ' '
            }
          }
            return;
        }
        if(round > 0){
          direction()
          return
        }
            var wordToEval = '';
                textArray.join("")
                extractSequence(textArray)
          for(var c = 0; getText.length > c; c++ ){
            wordToEval += getText[c].innerText
          }
        replenish()
        checkScore()

  })


    var extractSequence = function(sequence){
      console.log(sequence, 'in <sequ></sequ>')
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
    var checkScore = function(word) {
      console.log(word,'from checkScore')
      if(word){
        console.log('word')
        getPoints(word)
      } else {
        console.log('nonword')
        getPoints(getWord())
      }
    }


    ////////////////*****CHECK ROWS*****////////////////////////

    var getWord = function() {
      var wordToScore = [];
        var getTextRow = $('p.newChip')
        for (var j = 0; j < getTextRow.length; j++) {
              console.log(getTextRow[j],'getTextRow')
            if (alphabet.indexOf(getTextRow[j].innerText) >= 0) {
                wordToScore.push(getTextRow[j].innerText)
            }
        }
        console.log(wordToScore,'wordtoscore')
        return wordToScore.join("")
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
      console.log(wordToScore,'wordToScore')
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
        $scoreDisplay[0].innerText = totalPoints;
    }

    var addScore = function(){
      console.log('from Add Score')
      var $score = $('#score')[0].innerText
      var $scoreNum = parseInt($score)
      var $time = $('#countDown')[0].innerText
      var $timeNum = parseInt($time)

      var highScores = $('#scoreToBeat span')
        console.log(highScores,'highScores')
      for(var i = 0; i < highScores.length; i++){
        var highScore = highScores[i].innerText
        console.log(highScore, i,'highScore')
        var highNum = parseInt(highScore)
        console.log(highNum,'highNum')
        console.log($timeNum, '$scoreNum')
        var timeDifference = countDownInit - $timeNum
        console.log(timeDifference,'timeDifference')
        debugger;
         if(highNum === 0){
            highScores[i].innerText = $scoreNum + ' in ' + timeDifference + ' seconds ';
            return
          }
      }



    }

    //////////---VERTICAL OR HORIZONTAL---/////////////

    var direction = function() {
      var numRange = [];
      var $playedHand = $('div p.newChip')
      for(var i = 0; i < $playedHand.length; i++){
        console.log($playedHand[i],'playedHand')
        var $cellId = $playedHand[i].parentElement.id
        var $onlyId = $cellId.replace("cell", "")

        numRange.push($onlyId)
      }
    var difference = numRange[0] - numRange[1];
      if(difference < -2) {
        //Vertical Play
        checkEnds(numRange, 'vertical')
      } else {
        //Horizontal Play
        checkEnds(numRange, 'horizontal')
      }

    }

 //////////---CHECK ENDS---/////////////

var checkEnds = function(range, direction) {
  var wordToScore = [];
  var min = Math.min.apply(null, range)
  var max = Math.max.apply(null, range)
  var firstCell = $('#cell'+min), lastCell = $('#cell'+max), left = $('#cell'+(min-1)),
      right = $('#cell'+(max+1)), top = $('#cell'+(min-11)), bottom = $('#cell'+(max+11))
  if(direction === 'horizontal'){
      for(var i = min; i <= max; i++){
          var letterToPlay = $('#cell'+i)
        wordToScore.push(letterToPlay[0].innerText)
      }
        if(left[0].innerText.length > 0 ) {
          wordToScore.unshift(left[0].innerText)
        } else if (right[0].innerText.length > 0) {
          wordToScore.push(right[0].innerText)
        }
  } else if (direction === 'vertical') {
        for (var i = min; i <= max; i += 11){
          var letterToPlay = $('#cell'+i)
          wordToScore.push(letterToPlay[0].innerText)
        }
        if(top[0].innerText.length > 0 ) {
          wordToScore.unshift(top[0].innerText)
        } else if (bottom[0].innerText.length > 0) {
          wordToScore.push(bottom[0].innerText)
        }
    }
    var joinedWord = wordToScore.join("")
        checkScore(joinedWord)
        replenish()
}

    //////////---TIMER---/////////////

    var timer = function() {
    gameTimer = setInterval(function(){
      changeColors()
      minusSecond()
    }, 1000);
    }

  var minusSecond = function() {
      var $targetScore = $('span#target')[0].innerHTML
      var $targetScoreNum = parseInt($targetScore)
      var $playerScore = $('span#score')[0].innerHTML
      var $playerScoreNum = parseInt($playerScore)
      var $countDown = $('#countDown')[0].innerText
      if ($countDown > 0) {
          $('#countDown')[0].innerText = $countDown - 1;
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
  clearInterval(gameTimer)
  $('#countDown')[0].innerText = 0
}
    //////////---CLEARHAND---/////////////

    var clearHand = function() {
    var $playedChips = $('.newChip')
    $playedChips.empty()
    $playedChips.removeClass('.newChip')
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
        var $score = $('#score' + scoreCounter)
        gameOver.show()
        $('button#restartGame').click(function() {
          restartGame()
        })
    }

  //////////---CHECK WINNER---/////////////
    var checkWinner = function(){
      var $target = $('span#target')[0].innerText
      var $score = $('span#score')[0].innerText
      if( parseInt($score) > parseInt($target) ){
          $('#winScreen').show()
          addScore()
            $('button#restartGame').click(function(){
              restartGame()
            })
      }
    }

   var restartGame = function(){
      $('#centerColumn').hide()
      $('#leftColumn').hide()
      $('#winScreen').hide()
      $('.slots').empty()
      $('#startMenu').show()
      $('body').css('background-color','red')
   }

    var removeClass = function(){
      console.log('from remove class')
      $('p.newChip').removeClass('newChip')
    }


    // AJAX CALLS
 ////~~~~~~~IS It A Word?~~~~~~~~/////// -
    var isItAWord = function(word) {
      console.log(word,'from IS It a WOrd')
      word = word.toLowerCase()
        $.ajax({
                url:'https://glosbe.com/gapi/translate?from=eng&dest=eng&format=json&phrase=' + word + '&pretty=true' ,
                method: 'GET'
            })
            .done(function(data) {
                if(data.tuc){
                 calcPoints(word)
                 playedWords.push(word)
                 removeClass()
                 checkWinner()
                 round++
                } else {
                  alert("That's not a word!")
                  clearHand()
                  replenish()
                  round++
                }
            })
            console.log(playedWords,'playedWords')
      }
  }

