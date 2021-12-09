function reverseStr (str) {
    var listOfChars = str.split(''); // ['h', 'e', 'l'...]
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}