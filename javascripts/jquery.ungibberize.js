jQuery.fn.extend({
    ungibberize : function() {
        var self = this;
        var pos = this.offset();
        
        pos.top += (this.outerHeight() - this.height()) / 2;
        pos.left += (this.outerWidth() - this.width()) / 2;
        if(this.css("direction") == "ltr") {
            pos.left += this.width() - 16;
        }
        
        
        
        var undoVal = "";
        
        var button = $("<img>").attr({
	            src: ungibberize.getHeButtonFilename(this.height()),
	            title: '?עברית',
	            height: this.height(),
	            width: this.height()});
        button.css({
            display: "none",
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px"
        });
        button.appendTo(this.parent());
        button.click(function() {
            undoVal = self.val();
            self.val(ungibberize.engToHeb(self.val()));
            button.fadeOut();
            undoBtn.fadeIn();
            state="fixed";
            self.focus();
        });
        
        var undoBtn = $("<img>").attr({
	            src: ungibberize.getUndoRTLButtonFilename(this.height()),
	            title: 'ביטול',
	            height: this.height(),
	            width: this.height()});
        undoBtn.css({
            display: "none",
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px"
        });
        undoBtn.appendTo(this.parent());
        undoBtn.click(function() {
            self.val(undoVal);
            undoBtn.fadeOut();
            button.fadeIn();
            state="button";
            self.focus();
        });
            
        var state="fresh";
            
        this.keypress(function() {
            switch(state) {
                case "fresh":
                    if(ungibberize.shouldDisplayUngibberize(self.val())) {
                        self.width(self.width() - self.height() + 2);
                        self.css("padding-left", self.height() + 2);
                        button.fadeIn();
                        state="button";
                    }
                    break;
                case "button":
                    break;
                case "fixed":
                    undoBtn.fadeOut();
                    self.width(self.width() + self.height() - 2);
                    self.css("padding-left", 0);
                    state = "dirty";
                    break;
                case "dirty":
                    if(self.val() === "") {
                        state = "fresh";
                    }
                    break;
            }
        });
        
        this.blur(function() {
            button.fadeOut();
            undoBtn.fadeOut();
        }).focus(function() {
            if (state == "button") {
                button.fadeIn();
            } else if (state == "fixed") {
                undoBtn.fadeIn();
            }
        });
    }
});