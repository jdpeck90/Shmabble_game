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

            $('.slots').on('click', function(div) {
                $(this).addClass('newChip')
                console.log(div)
                div.toElement.innerText = innerText;
                e.currentTarget.remove()
            })
        })
        ////////////////*****CLICK TO MOVE FUNCTION -- NEW ELEMENT******////////////////////////
    $('div#test.letters').on('click', function(e) {
        var innerText = this.innerText

        $('.slots').on('click', function(div) {
            $(this).addClass('newChip')
            div.toElement.innerText = innerText;
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
        if ($('div#cell61.slots')[0].innerHTML === " ") {
            alert('You must start in the center')
            var getText = $('div.slots.newChip')
            for (var v = 0; v < getText.length; v++) {

                $('<div class="letters">' + getText[v].innerText + '</div>').attr('id', 'liveHand')
                    .appendTo('#chipPile')

                getText[v].innerText = ' '
            }
            return;
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
            console.log(wordToScoreColoumn.join(""), 'b4 return')
            console.log(wordToScoreColoumn.join(""), '@ return')
        }
        return wordToScoreColoumn.join("")
    }


    ////~~~~~~~IS It A Word?~~~~~~~~/////// -
    var isItAWord = function(word) {

        for (var i = 0; i < thousandWords.length; i++) {
            if (word === thousandWords[i]) {
                console.log('word')
                return;
            }
            console.log('notWord')
        }

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

    var timer = function() {
        setInterval(function() {
            var $countDown = $('#countDown')[0].innerText
            if ($countDown > 0) {
                $('#countDown')[0].innerText = $countDown - 1;
            }
            if ($countDown <= 0) {
                endGame()
                $('#countDown')[0].innerText = 0
            }
        }, 1000)
    }

    //////////---BEGINNING MESSAGE---/////////////

    var $begin = $('#begin')
    var $startGame = $('#startGame')

    $begin.on('click', function() {
        $startGame.hide()
        timer()

    })

    //////////---CLEARBOARD---/////////////
    var clearBoard = function() {
            $('span#countDown')[0].innerHTML = 100
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


        })
    }


    var makeClickable = function() {
        $('div#liveHand').on('click', function(e) {
            var innerText = this.innerText

            $('.slots').on('click', function(div) {
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
            }()

    var thousandWords = ['the',
        'of', 'to',
        'and',
        'a',
        'in',
        'is',
        'it',
        'you',
        'that',
        'he', 'was',
        'for',
        'on',
        'with', 'as', 'I', 'his', 'they', 'be', 'at', 'one', 'have',
        'this',
        'from',
        'or',
        'had',
        'by',
        'hot',
        'word',
        'but',
        'what',
        'some',
        'we',
        'can',
        'out',
        'other',
        'were',
        'all',
        'there',
        'when',
        'up',
        'use',
        'your',
        'how', 'said', 'an', 'each',
        'she', 'which', 'do', 'their', 'time', 'if', 'will', 'way', 'about', 'many', 'then', 'them', 'write',
        'would', 'like', 'so', 'these', 'her', 'long', 'make', 'thing', 'see', 'him', 'two',
        'has',
        'look',
        'more',
        'day',
        'could',
        'go',
        'come',
        'did',
        'number',
        'sound',
        'no',
        'most', 'people',
        'my', 'over', 'know',
        'water',
        'than',
        'call', 'first', 'who', 'may', 'down', 'side', 'been', 'now', 'find', 'any',
        'new',
        'work',
        'part',
        'take',
        'get',
        'place',
        'made',
        'live',
        'where',
        'after',
        'back',
        'little',
        'only',
        'round',
        'man',
        'year',
        'came',
        'show',
        'every',
        'good',
        'me',
        'give',
        'our',
        'under',
        'name',
        'very',
        'through',
        'just',
        'form',
        'sentence',
        'great',
        'think',
        'say',
        'help',
        'low',
        'line',
        'differ',
        'turn',
        'cause',
        'much',
        'mean',
        'before',
        'move',
        'right',
        'boy',
        'old',
        'too',
        'same',
        'tell',
        'does',
        'set',
        'three',
        'want',
        'air',
        'well',
        'also',
        'play',
        'small',
        'end',
        'put',
        'home',
        'read',
        'hand',
        'port',
        'large',
        'spell',
        'add',
        'even',
        'land',
        'here',
        'must',
        'big',
        'high',
        'such',
        'follow',
        'act',
        'why',
        'ask',
        'men',
        'change',
        'went',
        'light',
        'kind',
        'off',
        'need',
        'house',
        'picture',
        'try',
        'us',
        'again',
        'animal',
        'point',
        'mother',
        'world',
        'near',
        'build',
        'self',
        'earth',
        'father', 'head',
        'stand',
        'own',
        'page',
        'should',
        'country',
        'found',
        'answer',
        'school',
        'grow',
        'study',
        'still',
        'learn',
        'plant',
        'cover',
        'food',
        'sun',
        'four',
        'between',
        'state',
        'keep',
        'eye',
        'never',
        'last',
        'let',
        'thought',
        'city',
        'tree',
        'cross',
        'farm',
        'hard',
        'start',
        'might',
        'story',
        'saw',
        'far',
        'sea',
        'draw',
        'left',
        'late',
        'run',
        'don\'t',
        'while',
        'press',
        'close',
        'night',
        'real',
        'life',
        'few',
        'north',
        'open',
        'seem',
        'together',
        'next',
        'white',
        'children',
        'begin',
        'got',
        'walk',
        'example',
        'ease',
        'paper',
        'group',
        'always',
        'music',
        'those',
        'both',
        'mark',
        'often',
        'letter',
        'until',
        'mile',
        'river',
        'car',
        'feet',
        'care',
        'second',
        'book',
        'carry',
        'took',
        'science',
        'eat',
        'room',
        'friend',
        'began',
        'idea',
        'fish',
        'mountain',
        'stop',
        'once',
        'base',
        'hear',
        'horse',
        'cut',
        'sure',
        'watch',
        'color',
        'face',
        'wood',
        'main',
        'enough',
        'plain',
        'girl',
        'usual',
        'young',
        'ready',
        'above',
        'ever',
        'red',
        'list',
        'though',
        'feel',
        'talk',
        'bird',
        'soon',
        'body',
        'dog',
        'family',
        'direct',
        'pose',
        'leave',
        'song',
        'measure',
        'door',
        'product',
        'black',
        'short',
        'numeral',
        'class',
        'wind',
        'question',
        'happen',
        'complete',
        'ship',
        'area',
        'half',
        'rock',
        'order',
        'fire',
        'south',
        'problem',
        'piece',
        'told',
        'knew',
        'pass',
        'since',
        'top',
        'whole',
        'king',
        'space',
        'heard',
        'best',
        'hour',
        'better',
        'true',
        'during',
        'hundred',
        'five',
        'remember',
        'step',
        'early',
        'hold',
        'west',
        'ground',
        'interest',
        'reach',
        'fast',
        'verb',
        'sing',
        'listen',
        'six',
        'table',
        'travel',
        'less',
        'morning',
        'ten',
        'simple',
        'several',
        'vowel',
        'toward',
        'war',
        'lay',
        'against',
        'pattern',
        'slow',
        'center',
        'love',
        'person',
        'money',
        'serve',
        'appear',
        'road',
        'map',
        'rain',
        'rule',
        'govern',
        'pull',
        'cold',
        'notice',
        'voice',
        'unit',
        'power',
        'town',
        'fine',
        'certain',
        'fly',
        'fall',
        'lead',
        'cry',
        'dark',
        'machine',
        'note',
        'wait',
        'plan',
        'figure',
        'star',
        'box',
        'noun',
        'field',
        'rest',
        'correct',
        'able',
        'pound',
        'done',
        'beauty',
        'drive',
        'stood',
        'contain',
        'front',
        'teach',
        'week',
        'final',
        'gave',
        'green',
        'oh',
        'quick',
        'develop',
        'ocean',
        'warm',
        'free',
        'minute',
        'strong',
        'special',
        'mind',
        'behind',
        'clear',
        'tail',
        'produce',
        'fact',
        'street',
        'inch',
        'multiply',
        'nothing',
        'course',
        'stay',
        'wheel',
        'full',
        'force',
        'blue',
        'object',
        'decide',
        'surface',
        'deep',
        'moon',
        'island',
        'foot',
        'system',
        'busy',
        'test',
        'record',
        'boat',
        'common',
        'gold',
        'possible',
        'plane',
        'stead',
        'dry',
        'wonder',
        'laugh',
        'thousand',
        'ago',
        'ran',
        'check',
        'game',
        'shape',
        'equate',
        'hot',
        'miss',
        'brought',
        'heat',
        'snow',
        'tire',
        'bring',
        'yes',
        'distant',
        'fill',
        'east',
        'notice',
        'voice',
        'unit',
        'power',
        'town',
        'fine',
        'certain',
        'fly',
        'fall',
        'lead',
        'cry',
        'dark',
        'machine',
        'note',
        'wait',
        'plan',
        'figure',
        'star',
        'box',
        'noun',
        'field',
        'rest',
        'correct',
        'able',
        'pound',
        'done',
        'beauty',
        'drive',
        'stood',
        'contain',
        'front',
        'teach',
        'week',
        'final',
        'gave',
        'green',
        'oh',
        'quick',
        'develop',
        'ocean',
        'warm',
        'free',
        'minute',
        'strong',
        'special',
        'mind',
        'behind',
        'clear',
        'tail',
        'produce',
        'fact',
        'street',
        'inch',
        'multiply',
        'nothing',
        'course',
        'stay',
        'wheel',
        'full',
        'force',
        'blue',
        'object',
        'decide',
        'surface',
        'deep',
        'moon',
        'island',
        'foot',
        'system',
        'busy',
        'test',
        'record',
        'boat',
        'common',
        'gold',
        'possible',
        'plane',
        'stead',
        'dry',
        'wonder',
        'laugh',
        'thousand',
        'ago',
        'ran',
        'check',
        'game',
        'shape',
        'equate',
        'hot',
        'miss',
        'brought',
        'heat',
        'snow',
        'tire',
        'bring',
        'yes',
        'distant',
        'fill',
        'east',
        'paint',
        'language',
        'among',
        'grand',
        'ball',
        'yet',
        'wave',
        'drop',
        'heart',
        'am',
        'present',
        'heavy',
        'dance',
        'engine',
        'position',
        'arm',
        'wide',
        'sail',
        'material',
        'size',
        'vary',
        'settle',
        'speak',
        'weight',
        'general',
        'ice',
        'matter',
        'circle',
        'pair',
        'include',
        'divide',
        'syllable',
        'felt',
        'perhaps',
        'pick',
        'sudden',
        'count',
        'square',
        'reason',
        'length',
        'represent',
        'art',
        'subject',
        'region',
        'energy',
        'hunt',
        'probable',
        'bed',
        'brother',
        'egg',
        'ride',
        'cell',
        'believe',
        'fraction',
        'forest',
        'sit',
        'race',
        'window',
        'store',
        'summer',
        'train',
        'sleep',
        'prove',
        'lone',
        'leg',
        'exercise',
        'wall',
        'catch',
        'mount',
        'wish',
        'sky',
        'board',
        'joy',
        'winter',
        'sat',
        'written',
        'wild',
        'instrument',
        'kept',
        'glass',
        'grass',
        'cow',
        'job',
        'edge',
        'sign',
        'visit',
        'past',
        'soft',
        'fun',
        'bright',
        'gas',
        'weather',
        'month',
        'million',
        'bear',
        'finish',
        'happy',
        'hope',
        'flower',
        'clothe', 'strange',
        'gone',
        'jump',
        'baby',
        'eight',
        'village',
        'meet',
        'root',
        'buy',
        'raise',
        'solve',
        'metal',
        'whether',
        'push',
        'seven',
        'paragraph',
        'third',
        'shall',
        'held',
        'hair',
        'describe',
        'cook',
        'floor',
        'either',
        'result',
        'burn',
        'hill',
        'safe',
        'cat',
        'century',
        'consider',
        'type',
        'law',
        'bit',
        'coast',
        'copy',
        'phrase',
        'silent',
        'tall',
        'sand',
        'soil',
        'roll',
        'temperature',
        'finger',
        'industry',
        'value',
        'fight',
        'lie',
        'beat',
        'excite',
        'natural',
        'view',
        'sense',
        'ear',
        'else',
        'quite',
        'broke',
        'case',
        'middle',
        'kill',
        'son',
        'lake',
        'moment',
        'scale',
        'loud',
        'spring',
        'observe',
        'child',
        'straight',
        'consonant',
        'nation',
        'dictionary',
        'milk',
        'speed',
        'method',
        'organ',
        'pay',
        'age',
        'section',
        'dress',
        'cloud',
        'surprise',
        'quiet',
        'stone',
        'tiny',
        'climb',
        'cool',
        'design',
        'poor',
        'lot',
        'experiment',
        'bottom',
        'key',
        'iron',
        'single',
        'stick',
        'flat',
        'twenty',
        'skin',
        'smile',
        'strange',
        'gone',
        'jump',
        'baby',
        'eight',
        'village',
        'meet',
        'root',
        'buy',
        'raise',
        'solve',
        'metal',
        'whether',
        'push',
        'seven',
        'paragraph',
        'third',
        'shall',
        'held',
        'hair',
        'describe',
        'cook',
        'floor',
        'either',
        'result',
        'burn',
        'hill',
        'safe',
        'cat',
        'century',
        'consider',
        'type',
        'law',
        'bit',
        'coast',
        'copy',
        'phrase',
        'silent',
        'tall',
        'sand',
        'soil',
        'roll',
        'temperature',
        'finger',
        'industry',
        'value',
        'fight',
        'lie',
        'beat',
        'excite',
        'natural',
        'view',
        'sense',
        'ear',
        'else',
        'quite',
        'broke',
        'case',
        'middle',
        'kill',
        'son',
        'lake',
        'moment',
        'scale',
        'loud',
        'spring',
        'observe',
        'child',
        'straight',
        'consonant',
        'nation',
        'dictionary',
        'milk',
        'speed',
        'method',
        'organ',
        'pay',
        'age',
        'section',
        'dress',
        'cloud',
        'surprise',
        'quiet',
        'stone',
        'tiny',
        'climb',
        'cool',
        'design',
        'poor',
        'lot',
        'experiment',
        'bottom',
        'key',
        'iron',
        'single',
        'stick',
        'flat',
        'twenty',
        'skin',
        'smile',
        'crease',
        'hole',
        'trade',
        'melody',
        'trip',
        'office',
        'receive',
        'row',
        'mouth',
        'exact',
        'symbol',
        'die',
        'least',
        'trouble',
        'shout',
        'except',
        'wrote',
        'seed',
        'tone',
        'join',
        'suggest',
        'clean',
        'break',
        'lady',
        'yard',
        'rise',
        'bad',
        'blow',
        'oil',
        'blood',
        'touch',
        'grew',
        'cent',
        'mix',
        'team',
        'wire',
        'cost',
        'lost',
        'brown',
        'wear',
        'garden',
        'equal',
        'sent',
        'choose',
        'fell',
        'fit',
        'flow',
        'fair',
        'bank',
        'collect',
        'save',
        'control',
        'decimal',
        'gentle',
        'woman',
        'captain',
        'practice',
        'separate',
        'difficult',
        'doctor',
        'please',
        'protect',
        'noon',
        'whose',
        'locate',
        'ring',
        'character',
        'insect',
        'caught',
        'period',
        'indicate',
        'radio',
        'spoke',
        'atom',
        'human',
        'history',
        'effect',
        'electric',
        'expect',
        'crop',
        'modern',
        'element',
        'hit',
        'student',
        'corner',
        'party',
        'supply',
        'bone',
        'rail',
        'imagine',
        'provide',
        'agree',
        'thus',
        'capital',
        'wont',
        'chair',
        'danger',
        'fruit',
        'rich',
        'thick',
        'soldier',
        'process',
        'operate',
        'guess',
        'necessary',
        'sharp',
        'wing',
        'create',
        'neighbor',
        'wash',
        'bat',
        'rather',
        'crowd',
        'corn',
        'compare',
        'poem',
        'string',
        'bell',
        'depend',
        'meat',
        'rub',
        'tube',
        'famous',
        'dollar',
        'stream',
        'fear',
        'sight',
        'thin',
        'triangle',
        'planet',
        'hurry',
        'chief',
        'colony',
        'clock',
        'mine',
        'tie',
        'enter',
        'major',
        'fresh',
        'search',
        'send',
        'yellow',
        'gun',
        'allow',
        'print',
        'dead',
        'spot',
        'desert',
        'suit',
        'current',
        'lift',
        'rose',
        'continue',
        'block',
        'chart',
        'hat',
        'sell',
        'success',
        'company',
        'subtract',
        'event',
        'particular',
        'deal',
        'swim',
        'term',
        'opposite',
        'wife',
        'shoe',
        'shoulder',
        'spread',
        'arrange',
        'camp',
        'invent',
        'cotton',
        'born',
        'determine',
        'quart',
        'nine',
        'truck',
        'noise',
        'level',
        'chance',
        'gather',
        'shop',
        'stretch',
        'throw',
        'shine',
        'property',
        'column',
        'molecule',
        'select',
        'wrong',
        'gray',
        'repeat',
        'require',
        'broad',
        'prepare',
        'salt',
        'nose',
        'plural', 'anger',
        'claim',
        'continent',
        'oxygen',
        'sugar',
        'death',
        'pretty',
        'skill',
        'women',
        'season',
        'solution',
        'magnet',
        'silver',
        'thank',
        'branch',
        'match',
        'suffix',
        'especially',
        'fig',
        'afraid',
        'huge',
        'sister',
        'steel',
        'discuss',
        'forward',
        'similar',
        'guide',
        'experience',
        'score',
        'apple',
        'bought',
        'led',
        'pitch',
        'coat',
        'mass',
        'card',
        'band',
        'rope',
        'slip',
        'win',
        'dream',
        'evening',
        'condition',
        'feed',
        'tool',
        'total',
        'basic',
        'smell',
        'valley',
        'nor',
        'double',
        'seat',
        'arrive',
        'master',
        'track',
        'parent',
        'shore',
        'division',
        'sheet',
        'substance',
        'favor',
        'connect',
        'post',
        'spend',
        'chord',
        'fat',
        'glad',
        'original',
        'share',
        'station',
        'dad',
        'bread',
        'charge',
        'proper',
        'bar',
        'offer',
        'segment',
        'slave',
        'duck', 'instant', 'market', 'degree', 'populate', 'chick', 'dear',
        'enemy', 'reply', 'drink', 'occur', 'support', 'speech', 'nature',
        'range', 'steam', 'motion', 'path', 'liquid', 'log', 'meant',
        'quotient', 'teeth', 'shell', 'neck'
    ]
}
