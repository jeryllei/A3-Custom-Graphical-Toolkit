import {SVG} from './svg.min.js';

// Below function is taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

var MyToolkit = (function() {
    var draw = SVG().addTo('body').size('1920', '1080');
    var defaultGreen = "#009646";
    var defaultLGray = "#8c8c8c";
    var defaultGray = "#5c5c5c";
    var defaultBlack = "#000000";
    /** @module Button */
    var Button = function(){
        var rect = draw.rect(300,50).fill({ color: defaultGreen, opacity: 0.1}).stroke({ color: defaultGreen, opacity: 0.6, width: 5}).radius(25);
        var rectLabel = draw.text("");
        var buttonCont = draw.group();
        var clickEvent = null;
        var stateEvent = null;
        var currentState = "idle";
        rectLabel.dmove("7", "10");

        buttonCont.add(rect);
        buttonCont.add(rectLabel);

        rect.mouseover(function(){
            this.fill({ color: defaultGreen, opacity: 0.6});
            this.stroke({ width: 1});
            
            currentState = "hover";
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
                //console.log(this.x(), this.y());
                clickEvent(event)
        })
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the button around using x and y coordinates. */
            move: function(x, y) {
                rect.move(x, y);
                rectLabel.move(x, y);
                rectLabel.dmove("7", "15");
            },
            /** 
             * @param {string} text Text to be added to the button.
             * @description Add a text label to the button. */
            addLabel: function(text) {
                rectLabel.text(text);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to on click.
             * @description Add a function to the button that occurs on user click. */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            }
        }
    }
    /** @module CheckBox */
    var CheckBox = function(){
        //var draw = SVG().addTo('body').size('400', '400');
        var clickEvent = null;
        var clickedState = false;
        var rect = draw.rect(50, 50).fill({ color: defaultLGray }).radius(10);
        var rectLabel = draw.text("hello");
        rectLabel.dmove("55", "7");
        var chkBoxCont = draw.group()
        chkBoxCont.add(rect);
        chkBoxCont.add(rectLabel);

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
                //rect.move(x, y);
                //rectLabel.move(x, y);
                //rectLabel.dmove("55", "7");
                chkBoxCont.move(x, y);
            },
            addLabel: function(text) {
                rectLabel.text(text);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            }
        }
    }
    /** @module RadioButton  */
    var RadioButton = function() {
        var clickEvent = null;
        var buttonGroup = draw.group();
        var buttonArray = [];

        return {
            move: function(x, y) {
                buttonGroup.move(x, y);
            },
            addButton: function() {

            },
            removeButton: function(num) {
                buttonArray.splice(num, 1);
            }
        }
    }
    /** @module TextBox */
    var TextBox = function() {
        var txtBoxCont = draw.group();
        var boxBorder = draw.rect(300, 300).fill({ color: "#ffffff" }).stroke( { color: defaultBlack, width: 5});
        // Working text area implementation found at: https://github.com/svgdotjs/svg.js/issues/1058
        var foreignObject = draw.foreignObject(300, 300);
        var textArea = document.createElement('textarea');
        textArea.setAttribute("onchange", "console.log('Text area modified!')");
        textArea.setAttribute("rows", 20);
        textArea.setAttribute("cols", 35);
        foreignObject.add(textArea);
        txtBoxCont.add(boxBorder);
        txtBoxCont.add(foreignObject);
        return {
            move: function(x, y) {
                txtBoxCont.move(x, y);
            },
            getText: function(x, y) {
                return textArea.value
            }
        }
    }
    /** @module ScrollBar */
    var ScrollBar = function() {

    }
    /** @module ProgressBar */
    var ProgressBar = function() {
        var wdth = 300;
        var multiplier = 3.0;
        var increVal = 0;

        var prgBarCont = draw.group();
        var bar = draw.rect(wdth, 30).fill({ color: defaultGray });
        var progress = draw.rect(increVal, 30).fill({ color: defaultGreen});

        prgBarCont.add(bar);
        prgBarCont.add(progress);
        
        return {
            move: function(x, y) {
                //bar.move(x, y);
                //progress.move(x, y);
                prgBarCont.move(x, y);
            },
            setWidth: function(val) {
                wdth = val;
                multiplier = wdth / 100.0;
                bar.width(wdth);
                progress.width(increVal * multiplier);
                //console.log(increVal)
            },
            setValue: function(val) {
                increVal = val;
                if (increVal > 100)
                    increVal = 100;
                progress.width(increVal * multiplier);
            },
            getValue: function() {
                return increVal;
            },
            incrValue: function(val) {
                increVal += val;
                if (increVal > 100)
                    increVal = 100;
                progress.width(increVal * multiplier);
            }
        }
    }
    /** @module Magic8Ball */
    var Magic8Ball = function() {
        var clickEvent = null;
        var responded = false;
        var magicCont = draw.group();
        var ball = draw.circle(100).fill({ color: defaultBlack });
        var ball2 = draw.circle(50).fill({ color: "#ffffff"});
        var label8 = draw.text("8").font({ size: 30 });
        var response = draw.text("");
        var responses = ["Definitely yes", "My reply is no", "Maybe", "Ask again tomorrow", 
                        "Concentrate and ask again", "Don't count on it", "Very doubtful", 
                        "Cannot predict now", "Without a doubt"];

        ball2.dmove(25, 25);
        label8.dmove(42, 22);
        response.dmove(0, 100);
        magicCont.add(ball);
        magicCont.add(ball2);
        magicCont.add(label8);
        magicCont.add(response);

        magicCont.click(function(event){
            if(clickEvent != null)
                response.clear().text(responses[getRandomInt(0, 9)]);
                responded = true;
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                magicCont.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            wasClicked: function() {
                return responded
            }
        }
    }
return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar, Magic8Ball}
}());

export{MyToolkit}