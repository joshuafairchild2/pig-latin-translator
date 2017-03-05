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
} //check if letter is a vowel, return true/false accordingly


var toPigLatin = function(inputString) {
  var inputString = inputString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var inputString = inputString.replace(/\s{2,}/g," ");
  var individualWords = inputString.toLowerCase().split(' ');
  //input to lowercase, strip punctuation, split sentence into individual words

  var resultArray = [];

  individualWords.forEach(function(individualWord) {
    if (!isNaN(parseFloat(individualWord))) {
      resultArray.push(individualWord);
    } //pass numbers through with no changes

    var vowelsArray = [];
    for (var i = 0; i < individualWord.length; i++) {
      vowelsArray.push(checkForVowel(individualWord[i]));
    } //create an array of where the vowels and consonants are (vowel = true, consonant = false)

    for (var index = 0; vowelsArray[index] === false; index++) {
      if (vowelsArray[(index + 1)] === true) {
        resultArray.push((individualWord.substr(index + 1) + individualWord.substr(0, (index + 1))) + "ay");
      }
    } //translate a word that has 1 or more consonants (other than q) preceding first vowel

    if (checkForVowel(individualWord[0])) {
      resultArray.push(individualWord + "way");
    } //translate a word that starts with a vowel
  });

  resultArray = resultArray.join(" ");
  return resultArray;
}


$(function() {
  //ui logic below
  $("form").submit(function(event) {
    var inputString = $("#input").val();
    console.log(inputString);
    var outputString = toPigLatin(inputString);
    $("#output").text(outputString);
    event.preventDefault()
  });
});
