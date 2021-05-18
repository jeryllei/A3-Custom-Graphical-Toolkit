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
        var rect = draw.rect(300,50).fill({ opacity: 0.1}).stroke({ color: defaultGreen, opacity: 0.6, width: 5}).radius(25);
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
            transition()
        })
        rect.mouseout(function(){
            this.fill({ opacity: 0.1});
            this.stroke({ opacity: 0.6, width: 5 });

            currentState = "idle";
            transition()
        })
        rect.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        rect.mouseup(function(){
            this.fill({ color: defaultGreen});

            currentState = "depressed";
            transition();
        })
        buttonCont.click(function(event){
            rect.fill({ color: defaultGreen, opacity: 1});
            rect.stroke({opacity: 1});
            if(clickEvent != null)
                clickEvent(event)
        })
        function transition() {
            if (stateEvent != null)
                stateEvent(currentState)
        }
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the button around using x and y coordinates. 
            */
            move: function(x, y) {
                rect.move(x, y);
                rectLabel.move(x, y);
                rectLabel.dmove("7", "15");
            },
            /** 
             * @param {string} text Text to be added to the button.
             * @description Add a text label to the button. 
            */
            addLabel: function(text) {
                rectLabel.text(text);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to click event.
             * @description Add a function to the button that occurs on user click. 
            */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /** 
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to the button that occurs when widget state changes.
            */
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
    /** @module CheckBox */
    var CheckBox = function(){
        var clickEvent = null;
        var clickedState = false;
        var stateEvent = null;
        var currentState = "idle";
        var rect = draw.rect(50, 50).fill({ color: defaultLGray }).radius(10);
        var rectLabel = draw.text("");
        rectLabel.dmove("55", "7");
        var chkBoxCont = draw.group()
        chkBoxCont.add(rect);
        chkBoxCont.add(rectLabel);

        rect.mouseover(function() {
            currentState = "hover";
            transition();
        })
        rect.mouseout(function() {
            currentState = "idle";
            transition();
        })
        rect.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        rect.mouseup(function() {
            currentState = "depressed";
            transition();
        })
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

        function transition() {
            if (stateEvent != null) 
                stateEvent(currentState);
        }
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the button around using x and y coordinates. 
            */
            move: function(x, y) {
                chkBoxCont.move(x, y);
            },
            /** 
             * @param {string} text Text to be added to the check box.
             * @description Add a text label to the check box. 
            */
            addLabel: function(text) {
                rectLabel.text(text);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to click event.
             * @description Add a function to the button that occurs on user click. 
            */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /** 
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to the button that occurs when widget state changes.
            */
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
    /** @module RadioButton  */
    var RadioButton = function() {

        var rButton = function() {
            var button = draw.group();
            var label = draw.text();
            return {
                addLabel: function() {
                }
            }
        }

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
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the button around using x and y coordinates. 
            */
            move: function(x, y) {
                txtBoxCont.move(x, y);
            },
            /**
             * @description Gets the text inside the text box, returns as string.
             * @returns {string} Text inside the text box.
             */
            getText: function() {
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

        var progressState = "empty";
        var currentState = "idle";
        var stateEvent = null;
        var incrementEvent = null;

        var prgBarCont = draw.group();
        var bar = draw.rect(wdth, 30).fill({ color: defaultGray });
        var progress = draw.rect(increVal, 30).fill({ color: defaultGreen});

        prgBarCont.add(bar);
        prgBarCont.add(progress);

        prgBarCont.mouseover(function() {
            currentState = "hover";
            transition();
        })
        prgBarCont.mouseout(function() {
            currentState = "idle";
            transition();
        })
        prgBarCont.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        prgBarCont.mouseup(function() {
            currentState = "depressed";
            transition();
        })

        function increment() {
            if (incrementEvent != null)
                incrementEvent(progressState)
        }
        function transition() {
            if (stateEvent != null)
                stateEvent(currentState)
        }
        return {
            /**
             * @description Move the button around using x and y coordinates.
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             */
            move: function(x, y) {
                prgBarCont.move(x, y);
            },
            /**
             * @description Change the width (px) of the progress bar.
             * @param {Number} val The new width (px) of the progress bar.
             */
            setWidth: function(val) {
                wdth = val;
                multiplier = wdth / 100.0;
                bar.width(wdth);
                progress.width(increVal * multiplier);
            },
            /**
             * @description Change the current percentage progress of the progress bar.
             * @param {Number} val The new total progress of the progress bar.
             */
            setValue: function(val) {
                if (val < 0) {
                    val = 0;
                }
                increVal = val;
                if (increVal > 100) {
                    increVal = 100;
                    progressState = "full";
                }
                else if (increVal == 0) {
                    progressState = "empty";
                }
                else {
                    progressState = "in progress";
                }
                increment();
                progress.width(increVal * multiplier);
            },
            /**
             * @description Returns the current percentage of the progress bar.
             */
            getValue: function() {
                return increVal;
            },
            /** 
             * @description Increases or decreases the progress bar in terms of percentage.
             * @param {Number} val The increase or decrease in percentage of the progress bar.
             */
            incrValue: function(val) {
                increVal += val;
                if (increVal > 100) {
                    increVal = 100;
                    progressState = "full"
                }
                else if (increVal <= 0) {
                    increVal = 0;
                    progressState = "empty";
                }
                else {
                    progressState = "in progress";
                }
                increment();
                progress.width(increVal * multiplier);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to the progress bar that occurs when widget state changes.
            */
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler;
            },
            /**
             * @description Add a function to the progress bar that occurs when the progress bar increments.
             * @param {Function} eventHandler Function to be attached to increment event.
             */
            progressIncrement: function(eventHandler) {
                incrementEvent = eventHandler;
            },
            /**
             * @description Returns the current state of the progress bar as a string (empty, in progress, full).
             */
            getState: function() {
                return progressState;
            }
        }
    }
    /** @module Magic8Ball */
    var Magic8Ball = function() {
        var clickEvent = null;
        var responded = false;
        var stateEvent = null;
        var currentState = "idle";
        var magicCont = draw.group();
        var ball = draw.circle(100).fill({ color: defaultBlack });
        var ball2 = draw.circle(50).fill({ color: "#ffffff"});
        var label8 = draw.text("8").font({ size: 30 });
        var clickArea = draw.circle(100).fill({ opacity: 0 });
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
        magicCont.add(clickArea);


        clickArea.mouseover(function() {
            currentState = "hover";
            transition();
        })
        clickArea.mouseout(function() {
            currentState = "idle";
            transition();
        })
        clickArea.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        clickArea.mouseup(function() {
            currentState = "depressed";
            transition();
        })
        clickArea.click(function(event){
            if(clickEvent != null)
                response.clear().text(responses[getRandomInt(0, 9)]);
                responded = true;
                clickEvent(event)
        })
        function transition() {
            if (stateEvent != null) {
                stateEvent(currentState)
            }
        }
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the button around using x and y coordinates. 
            */
            move: function(x, y) {
                magicCont.move(x, y);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to click event.
             * @description Add a function to the magic 8 ball that occurs on user click. 
            */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /**
             * @description Returns true or false, depending on whether or not the user has clicked on the magic 8 ball.
             */
            wasClicked: function() {
                return responded
            },
            /**
             * @description Add a function to the magic 8 ball that occurs when the widget state changes.
             * @param {Function} eventHandler Function to be attached to state event.
             */
            stateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
return {Button, CheckBox, RadioButton, TextBox, ScrollBar, ProgressBar, Magic8Ball}
}());

export{MyToolkit}