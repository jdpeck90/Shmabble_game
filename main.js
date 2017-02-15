var points = 0;
$(init);

function init() {
 console.log("-------POINTS-----------")
console.log("If points aren't coming up you might need to put CORS on.")

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
              console.log(this,'b')
              var pTag = div.currentTarget.firstChild
              console.log(pTag,'ptag')
              pTag.innerText = innerText;
              $(pTag).addClass('newChip')
                e.currentTarget.remove()
            })
        })

    ////////////////*****REPLENISH******////////////////////////

    var replenish = function() {
        var usedChips = $('p.newChip')

        for (var i = 0; i < usedChips.length; i++) {
          if(usedChips[i].innerText.length > 0) {
            $('<div class="letters">' + alphabet[Math.floor(Math.random()*alphabet.length)] + '</div>')
                .attr('id', 'liveHand')
                .appendTo('#chipPile')
        }
      }

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

        // $('div#liveHand').on('click', function(e) {
        //   console.log('2nd click')
        //     var innerText = this.innerText
        //     $('.slots').on('click', function(div) {
        //         var addText = $( '<p class="newChip">'+innerText+'</p>' )
        //         $( div.currentTarget ).append( $(addText) )
        //         innerText = ''
        //         e.currentTarget.remove()
        //     })
        // })

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
        getPoints(word)
      } else {
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
        console.log(totalPoints,'totalPoints')

        $scoreDisplay[0].innerText = totalPoints;
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

  console.log(min, max, 'min/max')
  if(direction === 'horizontal'){
      var firstCell = $('#cell'+min), lastCell = $('#cell'+max), left = $('#cell'+(min-1)),
      right = $('#cell'+(max+1)), top = $('#cell'+(min-11)), bottom = $('#cell'+(max+11))
    if((max - min) > 0) {
       newNum = max - min
      for(var i = min; i <= max; i++){
          var letterToPlay = $('#cell'+i)
        wordToScore.push(letterToPlay[0].innerText)
      }
      if($('#cell'+(min-1))[0].innerText.length > 0
          || $('#cell'+(max+1))[0].innerText.length > 0){
        console.log($('#cell'+(min-1))[0].innerText, 'trigger' )
        console.log('there is something to the left')
        wordToScore.unshift(left)
      }
    }
    console.log(firstCell, lastCell, 'First Last' )
    console.log(left, right, 'Left Right' )
    console.log(top, bottom, 'top bottom')
console.log(wordToScore.join(""),'wordToScoreJOIN')
        checkScore()
        replenish()
      console.log(wordToScore,'wordToScore in checkEnds')
      console.log(firstCell,'first')
  }

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
              direction()
                if(data.tuc){
                 calcPoints(word)
                 playedWords.push(word)
                 round++
                } else {
                  alert("That's not a word!")
                  clearHand()
                  replenish()
                  round++
                }
            })
             removeClass()
            console.log(playedWords,'playedWords')
      }
  }

