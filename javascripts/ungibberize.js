var hebrewToEnglishConversionTable = new Array();
var englishToHebrewConversionTable = new Array();

createConversionTables();

function createConversionTables() {
  var hebrewChars  = ";/'קראטוןםפשדגכעיחלךף,זסבהנמצתץ."; 
  var englishChars = "`qwertyuiopasdfghjkl;'zxcvbnm,./";

  for( var i=0; i<hebrewChars.length; i++ ) {
    hebrewToEnglishConversionTable[hebrewChars[i]]  = englishChars[i];
    englishToHebrewConversionTable[englishChars[i]] = hebrewChars[i];
  }
}

function convert( s, table ) {
  var converted = "";
  for(var i=0; i<s.length; i++) {
    converted += table[s[i]] || s[i];
  }
  return converted;
}

function hebToEng( hebrewString ) {
  return convert( hebrewString, hebrewToEnglishConversionTable);
} 

function engToHeb( englishString ) {
  return convert( englishString, englishToHebrewConversionTable);
} 