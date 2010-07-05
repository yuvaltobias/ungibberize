jQuery.fn.extend({
    ungibberize : function() {
        var self = this;
        var pos = this.offset();
        
        pos.top += this.outerHeight() / 2 - 8;
        pos.left += (this.outerWidth() - this.width()) / 2;
        if(this.css("direction") == "ltr") {
            pos.left += this.width() - 16;
        }
        
        
        
        var undoVal = "";
        
        var button = $("<img>").attr("src", "images/ungibberize-he-16.png");
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
        
        var undoBtn = $("<img>").attr("src", "images/ungibberize-rtlundo-16.png");
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
                        self.width(self.width() - 18);
                        self.css("padding-left", 18);
                        button.fadeIn();
                        state="button";
                    }
                    break;
                case "button":
                    break;
                case "fixed":
                    undoBtn.fadeOut();
                    self.width(self.width() + 18);
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