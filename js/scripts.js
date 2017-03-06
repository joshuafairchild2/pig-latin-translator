//frontend
$(function() {
  $("form").submit(function(event) {
    var inputString = $("#input").val();
    var outputString = toPigLatin(inputString);
    if (outputString === "") {
      $('#output').show();
      $('#output').text('Please enter a word or phrase');
    } else {
      $("#output").show();
      $("#output").text(outputString);
    }
    event.preventDefault()
  });
});

//backend
var checkForVowel = function(letter) {
    var vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    for (var index = 0; index < vowels.length; index += 1) {
      if (vowels[index] === letter) {
        var isVowel = true;
      }
    }
    if (isVowel === true) {
      return true;
    } else {
      return false;
    }
} //function to check if letter is a vowel, return true/false accordingly

var toPigLatin = function(inputString) {
  var inputString = inputString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var inputString = inputString.replace(/\s{2,}/g," ");
  var individualWords = inputString.toLowerCase().split(' ');
  //transform input to lowercase, remove punctuation, split input into an array of words

  var resultArray = [];
  //create empty array to collect all of the translated words

  individualWords.forEach(function(individualWord) {
    var vowelsArray = [];
    for (var i = 0; i < individualWord.length; i++) {
      if (individualWord[i] === "y" && i === 0) {
        vowelsArray.push(false); //if "y" is the first letter of the word it is considered a consonant
      } else {
        vowelsArray.push(checkForVowel(individualWord[i]));
      }
    } //create an array of booleans representing "vowel" and "consonant" where true = vowel and false = consonant
    console.log(vowelsArray);
    if (!isNaN(parseFloat(individualWord))) {
      resultArray.push(individualWord); //pass numbers through translator unchanged
    }  else if (checkForVowel(individualWord[0]) && individualWord[0] !== "y") {
      resultArray.push(individualWord + "ay");
    } //translate a word that starts with a vowel

    for (var index = 0; vowelsArray[index] === false; index++) {
      if (individualWord[index] === "q" && individualWord[(index + 1)] === "u") { //translate a word containing a "q"
        resultArray.push((individualWord.substr(index + 2) + individualWord.substr(0, (index + 2))) + "ay");
      } else if (vowelsArray[(index + 1)] === true) {
        resultArray.push((individualWord.substr(index + 1) + individualWord.substr(0, (index + 1))) + "ay");
      } //translate a word that has 1 or more consonants (other than q) preceding first vowel
    }
  });

  resultArray = resultArray.join(" ");
  //concat the translated words back into a sentence
  return resultArray;
}
