jQuery.fn.extend({
    ungibberize : function() {
        var self = this;
        var pos = this.offset();
        
        pos.top += (this.outerHeight() - this.height()) / 2;
        pos.left += (this.outerWidth() - this.width()) / 2;
        
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
            self.val(ungibberize.engToHeb(self.val()));
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