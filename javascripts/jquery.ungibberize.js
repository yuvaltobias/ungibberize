jQuery.fn.extend({
    ungibberize : function() {
        var self = this;
        var pos = this.offset();
        
        console.log(pos);
        
        pos.top += this.outerHeight() / 2 - 8;
        pos.left += (this.outerWidth() - this.width()) / 2;
        if(this.css("direction") == "ltr") {
            pos.left += this.width() - 16;
        }
        
        
        var button = $("<img>").attr("src", "images/ungibberize-he-16.png");
        button.css({
            display: "none",
            position: "absolute",
            left: pos.left + "px",
            top: pos.top + "px"
        });
        button.appendTo(this.parent());
        button.click(function() {
            self.val(hebToEng(self.val()));
        });
            
        this.focus(function() {
            button.fadeIn();
        });
    }
});