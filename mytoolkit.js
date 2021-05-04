import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    var Button = function(){
        var defaultGreen = "#009646"
        var draw = SVG().addTo('body').size('1500','1500');
        var rect = draw.rect(300,50).fill({ color: defaultGreen, opacity: 0.1}).stroke({ color: defaultGreen, opacity: 0.6, width: 5}).radius(25);
        var rectLabel = draw.text("");
        var clickEvent = null;
        rectLabel.dmove("7", "10");
        var rect_x = rect.x();
        var rect_y = rect.y();

        rect.mouseover(function(){
            this.fill({ color: defaultGreen, opacity: 0.6});
            this.stroke({ width: 1});
        })
        rect.mouseout(function(){
            this.fill({ color: '#363636', opacity: 0.1});
            this.stroke({ opacity: 0.6, width: 5 });
        })
        rect.mouseup(function(){
            this.fill({ color: defaultGreen});
        })
        rect.click(function(event){
            this.fill({ color: defaultGreen, opacity: 1});
            this.stroke({opacity: 1});
            if(clickEvent != null)
                console.log(rect_x, rect_y);
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
                rect_x = x;
                rect_y = y;
                rectLabel.move(x, y);
                rectLabel.dmove("7", "15");
            },
            addLabel: function(text) {
                rectLabel.text(text);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            }
        }
    }
return {Button}
}());

export{MyToolkit}