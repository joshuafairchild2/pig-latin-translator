//business logc
//takes a letter as an argument, returns true if it is a vowel, false otherwise
var checkForVowel = function(letter) {
  var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
  var isVowel = false;
  for (var index = 0; index < vowels.length; index += 1) {
    if (vowels[index] === letter) {
      var isVowel = true;
    }
  }
  return isVowel;
}

var toPigLatin = function(inputString) {
  //transform input to lowercase, remove punctuation, split into an array of words
  //initialize empty array to collect all of the translated words
  var individualWords = inputString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'').toLowerCase().split(' ');
  var resultArray = [];

  individualWords.forEach(function(individualWord) {
    //create an array of booleans representing "vowel" and "consonant" where true = vowel and false = consonant
    var vowelsArray = [];
    for (var i = 0; i < individualWord.length; i++) {
      if (individualWord[i] === "y" && i === 0) {
        vowelsArray.push(false); //if "y" is the first letter of the word it is considered a consonant
      } else {
        vowelsArray.push(checkForVowel(individualWord[i]));
      }
    }

    //pass numbers through translator unchanged
    if (!isNaN(parseFloat(individualWord))) {
      resultArray.push(individualWord);
    }
    //translate a word that starts with a vowel
    if (checkForVowel(individualWord[0]) && individualWord[0] !== "y") {
      resultArray.push(individualWord + "ay");
    }

    //iterate through a word, stopping when the next character is a vowel
    for (var index = 0; vowelsArray[index] === false; index++) {
      //translate a word containing a "q"
      if (individualWord[index] === "q" && individualWord[(index + 1)] === "u") {
        resultArray.push((individualWord.substr(index + 2) + individualWord.substr(0, (index + 2))) + "ay");
      }
      //translate a word that has 1 or more consonants (other than q) preceding first vowel
      else if (vowelsArray[(index + 1)] === true) {
        resultArray.push((individualWord.substr(index + 1) + individualWord.substr(0, (index + 1))) + "ay");
      }
    }
  });
  return resultArray.join(" ");
}

//ui logic
$(function() {
  $("form").submit(function(event) {
    var inputString = $("#input").val();
    var outputString = toPigLatin(inputString);
    if (outputString === "") {
      alert('Please enter a word or phrase');
    } else {
      $("#output").show().text(outputString);
    }
    $(this).trigger('reset');
    event.preventDefault();
  });
});
