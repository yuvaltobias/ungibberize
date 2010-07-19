       (function($) {
           $(function() {
                $('input.gibberizable-he').each(function(){ $(this).ungibberize();});
            });
        })(jQuery);

jQuery.fn.extend({
    ungibberize : function() {
        var self = this;
        var pos = this.offset();
        
        pos.top += (this.outerHeight() - this.height()) / 2;
        pos.left += (this.outerWidth() - this.width()) / 2 + 3;
        
        var undoVal = "";
        
        var btnHe = $("<img>").attr({
            src: ungibberize.getHeButtonFilename(this.height()),
            title: '?עברית',
            height: this.height(),
            width: this.height() });
        btnHe.css({
            display: "none",
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px" });
        btnHe.appendTo(this.parent());
        btnHe.click(function() {
            undoVal = self.val();
            self.val(ungibberize.en2he(self.val()));
            btnHe.fadeOut('fast');
            btnUndo.fadeIn('fast');
            state = "undo";
            self.focus();
        });
        
        var btnUndo = $("<img>").attr({
            src: ungibberize.getUndoRTLButtonFilename(this.height()),
            title: 'ביטול',
            height: this.height(),
            width: this.height() });
        btnUndo.css({
            display: "none",
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px" });
        btnUndo.appendTo(this.parent());
        btnUndo.click(function() {
            self.val(undoVal);
            btnUndo.fadeOut('fast');
            btnHe.fadeIn('fast');
            state = "button";
            self.focus();
        });

        var state = ungibberize.shouldDisplayUngibberize(self.val()) ? "button" : "no_button";
        if(state === "button") {
            self.width(self.width() - self.height() - 2);
            self.css("padding-left", self.height() + 2);
        } else {
            self.css("padding-left", 0);
        }

        this.keyup(function() {
            switch(state) {
                case "no_button":
                    if(ungibberize.shouldDisplayUngibberize(self.val())) {
                        self.width(self.width() - self.height() - 2);
                        self.css("padding-left", self.height() + 2);
                        btnHe.fadeIn('fast');
                        state = "button";
                    }
                    break;
                case "button":
                    if(!ungibberize.shouldDisplayUngibberize(self.val())) {
                        btnHe.fadeOut('fast');
                        self.width(self.width() + self.height() + 2);
                        self.css("padding-left", 0);
                        state = "no_button";
                    }
                    break;
                case "undo":
                    btnUndo.fadeOut('fast');
                    self.width(self.width() + self.height() + 2);
                    self.css("padding-left", 0);
                    state = "inactive";
                    if(self.val().length < 4) {
                        state = "no_button";
                    }
                    break;
                case "inactive":
                    if(self.val().length < 4) {
                        state = "no_button";
                    }
                    break;
            }
        });
        
        this.blur(function() {
            btnHe.fadeOut('fast');
            btnUndo.fadeOut('fast');
        }).focus(function() {
            if (state == "button") {
                btnHe.fadeIn('fast');
            } else if (state == "undo") {
                btnUndo.fadeIn('fast');
            }
        });
    }
});

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

    function he2en( hebrewString ) {
      return convert( hebrewString, hebrewToEnglishConversionTable);
    } 

    function en2he( englishString ) {
      return convert( englishString, englishToHebrewConversionTable);
    }
    
    function shouldDisplayUngibberize( s ) {
        if( s.length < 4 ) return false;
        
        var hebrewChars  = 'אבגדהוזחטיכךלמםנןסעפףצץקרשת';
        var englishChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var hebrewCharCount  = 0;
        var englishCharCount = 0;
        
        for( i = 0; i < s.length; i++ ) {
            if( hebrewChars.indexOf(s[i]) >= 0 ) {
                hebrewCharCount++;
            } else if( englishChars.indexOf(s[i]) >= 0 ) {
                englishCharCount++;
            }
        }
        
        return hebrewCharCount < englishCharCount;
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
        en2he : en2he,
        shouldDisplayUngibberize : shouldDisplayUngibberize,
        getHeButtonFilename : getHeButtonFilename,
        getUndoRTLButtonFilename : getUndoRTLButtonFilename
    }
})();