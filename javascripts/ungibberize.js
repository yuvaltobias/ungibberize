this.ungibberize = (function() {
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
    
    function shouldDisplayUngibberize( s ) {
        if( s.length < 4 ) return false;
        
        var hebrewChars  = 'אבגדהוזחטיכךלמםנןסעפףצץקרשת';
        var englishChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var hebrewCharsCount  = 0;
        var englishCharsCount = 0;
        
        for( i = 0; i < s.length; i++ ) {
            if( hebrewChars.indexOf(s[i]) >= 0 ) {
                hebrewCharsCount++;
            } else if( englishChars.indexOf(s[i]) >= 0 ) {
                englishCharsCount++;
            }
        }
        
        return hebrewCharsCount < englishCharsCount;
    }

    function calcOptimalImageSize( n ) {
        var availableSizes = new Array(12, 16, 20, 32);

        for( i = 0; i < availableSizes.length-1; i++ ) {
            if( availableSizes[i] >= n ) {
                return availableSizes[i];
            }
        }

        return availableSizes.pop();
    }

    function getHeButtonFilename( height ) {
        return "images/ungibberize-he-" + calcOptimalImageSize(height) + ".png"
    }

    function getUndoRTLButtonFilename( height ) {
        return "images/ungibberize-rtlundo-" + calcOptimalImageSize(height) + ".png"
    }

    return {
        engToHeb : engToHeb,
        shouldDisplayUngibberize : shouldDisplayUngibberize,
        getHeButtonFilename : getHeButtonFilename,
        getUndoRTLButtonFilename : getUndoRTLButtonFilename
    }
})();
