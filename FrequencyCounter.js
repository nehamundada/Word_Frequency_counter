
/* This class contains methods that counts the occurrences  of words
* and returns given number of items ordered by word frequency */

function FrequencyCounter() {

    /* This map would maintain word count of each unique word.
    * As this map would be needed across the functions it is created as a member variable*/
    this.wordCountMap = {};

    /**
     * This method returns String array sorted by most frequent word.
     * Cases Handled;
     * 1. If null/empty string is provided as input then empty array is returned
     * 2. If numberOfItems is less then zero then error message given and empty array is returned
     * 3. If numberOfItems is greater than unique words then all the words are returned
     */
     this.getMostFrequentWords = function (text, items) {
         if( text == '' || text == null)
            return [];
         if(items <= 0) {
             console.error("Number of items to be returned can not be negative");
             return [];
         }

         var result = text.split(" ");
         for (var res in result) {
            var word = result[res];
            this.addWordsToMap(word);
         }

        /* We can comment this call once we know the construction of map works correct */
        this.printMap();

        return this.getSortedWordArray(items);
    };

    /* This method add unique words to the map and maintain count of
    * number of occurrences of those unique words in the given text */
    this.addWordsToMap = function (word) {

        if (word in this.wordCountMap) {
            this.wordCountMap[word] = this.wordCountMap[word] + 1;
        }
        else {
            this.wordCountMap[word] = 1;
        }
    };

    /* Utility method to print the word-count map */
    this.printMap = function() {
        console.log("-----------  Map  -------------------------");
        for(key in this.wordCountMap){
            console.log(key + ":" + this.wordCountMap[key])
        }
        console.log("-------------------------------------------");
    };

    /* This method implements Count sort, which works in o(n) complexity. */
    this.getSortedWordArray = function(items) {

        var tokenArray = [];
        var maxSoFar = 0;

         /* Push token objects into tokenArray and
         keep track of maximum frequency found so far for any word */
        for (var word in this.wordCountMap){
            tokenArray.push(new Token(word, this.wordCountMap[word]));
            if(maxSoFar < this.wordCountMap[word]){
                maxSoFar = this.wordCountMap[word];
            }
        }

        this.wordCountMap = null;  // Empty map to save space, as it's not needed further

        /* Ths array keeps track of unique word's frequency */
        var wordFrequency = new Array(maxSoFar+1);

        for(var index = 0; index < wordFrequency.length; index++){
            wordFrequency[index] = 0;  //Initialization
        }

        /* Puts the frequency of each word at index equal to frequency-number in the wordFrequency array */
        for(var index=0; index < tokenArray.length; index++){
            var frequency = tokenArray[index].frequency;
            wordFrequency[frequency] += 1;
        }

        /* Adding the previous counts to keep track of current index.
         * As counting sort works by placing an element to a position one grater than total number
          * of elements smaller than given element.  */
        for(var i=1; i < wordFrequency.length; i++){
            wordFrequency[i] += wordFrequency[i-1];
        }

        /* This array maintains list of unique words */
        var stringArray = new Array(tokenArray.length);

        /* Puts a word-item at an index = frequency-1 in string array
        * as the array index starts from 0, 1 is subtracted from frequency to get index */
        for(var i=0; i<tokenArray.length; i++){
            var index = wordFrequency[tokenArray[i].frequency] - 1;
            stringArray[index] = tokenArray[i].word;
            wordFrequency[tokenArray[i].frequency] -= 1;
        }

        /* The final array */
        var resultArray = [];

        /* Since the array is sorted in ascending order, traversing element from last to push n resultArray.
         * Pushing only k top frequent words( k = number of items) */
        var i = stringArray.length-1;
        while(items > 0 && i >= 0) {
            resultArray.push(stringArray[i]);
            i--;
            items--;
        }

        return resultArray;
    };
}

/* This class contains text for each word and count of number of it's occurrences in the text string */
function Token(word, frequency) {
    this.word = word;
    this.frequency = frequency;
}


/* Calling the function FrequencyCounter with sample inputs */

var text = "hi there how hi you hi there are hi there how hi you hi there are hi there how hi";
var items = 4;
var frequencyCounter = new FrequencyCounter();
var result = frequencyCounter.getMostFrequentWords(text, items);
console.log("Final list of word ordered by word frequency: ");
console.log(result);
