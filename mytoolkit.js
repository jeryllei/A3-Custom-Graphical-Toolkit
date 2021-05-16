import {SVG} from './svg.min.js';

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('1920', '1080');
    var defaultGreen = "#009646";
    var defaultLGray = "#8c8c8c";
    var defaultGray = "#5c5c5c";
    var Button = function(){
        //var draw = SVG().addTo('body').size('1500','1500');
        var rect = draw.rect(300,50).fill({ color: defaultGreen, opacity: 0.1}).stroke({ color: defaultGreen, opacity: 0.6, width: 5}).radius(25);
        var rectLabel = draw.text("");
        var clickEvent = null;
        rectLabel.dmove("7", "10");

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
                console.log(this.x(), this.y());
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
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
    var CheckBox = function(){
        //var draw = SVG().addTo('body').size('400', '400');
        var clickEvent = null;
        var rect = draw.rect(50, 50).fill({ color: defaultLGray }).radius(10);
        var clickedState = false;
        var rectLabel = draw.text("hello");
        rectLabel.dmove("55", "7");

        rect.click(function(event){
            clickedState = !clickedState;
            if (clickedState)
                this.fill({ color: defaultGray});
            else
                this.fill({ color: defaultLGray});
            if(clickEvent != null)
                console.log(clickedState);
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                rect.move(x, y);
                rectLabel.move(x, y);
                rectLabel.dmove("55", "7");
            },
            addLabel: function(text) {
                rectLabel.text(text);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            }
        }
    }
    var RadioButton = function() {
        var clickEvent = null;
    }
    var TextBox = function() {

    }
    var ScrollBar = function() {

    }
    var ProgressBar = function() {
        var wdth = 300;
        var multiplier = 3.0;
        var increVal = 0;

        var bar = draw.rect(wdth, 30).fill({ color: defaultGray });
        var progress = draw.rect(increVal, 30).fill({ color: defaultGreen});
        return {
            move: function(x, y) {
                bar.move(x, y);
                progress.move(x, y);
            },
            setWidth: function(val) {
                wdth = val;
                multiplier = wdth / 100.0;
                bar.width(wdth);
                progress.width(increVal * multiplier);
                console.log(increVal)
            },
            setValue: function(val) {
                increVal = val;
                progress.width(increVal * multiplier);
            },
            getValue: function() {
                return increVal;
            }
        }
    }
return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar}
}());

export{MyToolkit}