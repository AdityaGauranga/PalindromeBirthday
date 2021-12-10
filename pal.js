function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
  
    // return str.split('').reverse().join('');
    // in one line
  }
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
    if (str === reverse) {
      return true;
    } else {
      return false;
    }
  }
  
  function convertDatetoStr(date){
    var dateStr = {day: '', month: '', year: ''};
  
      if (date.day < 10){
      dateStr.day = '0' + date.day;
      }
      else {
      dateStr.day = date.day.toString();
      }
  
      if (date.month < 10){
      dateStr.month = '0' + date.month;
      }
      else {
      dateStr.month = date.month.toString();
      }
  
      dateStr.year = date.year.toString();
  
      return dateStr;
  
  }
  
  function getAllDateFormats(date){
    var dateStr = convertDatetoStr(date);
  
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy =  dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date){
    var listOfPalindromes = getAllDateFormats(date);
  
    var flag = false; // this is false by default as this will checked in the for loop
  
    for (var i=0; i<listOfPalindromes.length; i++) {
      if (isPalindrome(listOfPalindromes[i])){ // here inside IF, isPalindrome array is inserted so that the for loop will iterate for every element in that array
        flag = true; // if any of them is true, break the loop since we got a palindrome
        break;
      }
    }
  
    return flag;  
  }
  
  // check for leap year
  function isLeapYr(year){
    if(year % 400 === 0){
      return true;
    }
    if(year % 100 === 0){
      return false;
    }
    if (year % 4 === 0){
    return true;
  }
  return false;
  }
  
  // gets next date
  function getNextDate(date){
    var day = date.day + 1; // increment the day
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
  
    if (month === 2){ // check for February 
      // check for leap year
      if(isLeapYr(year)){
        if (day > 29){
          day = 1;
          month = month + 1; // increment month
        }
      }
        else {
          if(day > 28){
            day = 1;
            month = month + 1;
          }
        }
  
  }
  // check for other months
  else {
    // check if the day exceeds the max days in month
    if(day > daysInMonth[month - 1]){ 
      day = 1;
      month = month + 1;
    }
  }
  
  // increment year if month greater than 12
  if (month > 12){
    month = 1;
    year = year + 1;
  }
  
  return {
    day: day,
    month: month,
    year: year
  };
  }
  
  // gets next palindrome date
  function getNextPalDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);
  
    while(1){
      ctr++;
      var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
      if(isPalindrome){
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [ctr, nextDate];
  
  }
  
  var dateInput = document.querySelector("#bday-input");
  var showBtn = document.querySelector("#show-btn");
  var result = document.querySelector("#result");
  
  function clickHandler (e) {
    var bdayStr = dateInput.value;
  
    if (bdayStr !== '') {
      var listOfDate = bdayStr.split('-');
  
      var date = {
        day: Number(listOfDate[2]),
        month: Number(listOfDate[1]),
        year: Number(listOfDate[0])
    };
  
    var isPalindrome = checkPalindromeForAllDateFormats(date);
  
    if (isPalindrome) {
      result.textContent = "Woohoo! Your birthday is a Palindrome!"
    }
    else {
      var [ctr, nextDate] = getNextPalDate(date);
      result.textContent = `The Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, You missed it by ${ctr} days!`
    }
  }
  }
  
  showBtn.addEventListener('click', clickHandler);