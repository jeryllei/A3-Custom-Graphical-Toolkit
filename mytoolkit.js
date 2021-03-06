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
    var defaultDarkGreen = "#007838";
    var defaultLGray = "#8c8c8c";
    var defaultGray = "#5c5c5c";
    var defaultBlack = "#000000";
    /** @module Button */
    var Button = function(){
        var rect = draw.rect(300,50).fill({ color: defaultLGray, opacity: 0}).stroke({ color: defaultDarkGreen, width: 3 }).radius(25);
        var rectLabel = draw.text("");
        var buttonCont = draw.group();
        var clickEvent = null;
        var stateEvent = null;
        var currentState = "idle";
        rectLabel.dmove("7", "10");

        buttonCont.add(rect);
        buttonCont.add(rectLabel);
        rect.mouseover(function(){
            this.fill({ color: defaultGray, opacity: 0.5 });
            currentState = "hover";
            transition()
        })
        rect.mouseout(function(){
            this.fill({ color: defaultLGray, opacity: 0 });
            currentState = "idle";
            transition()
        })
        rect.mousedown(function() {
            this.fill({ color: defaultDarkGreen, opacity: 1 });
            currentState = "pressed";
            transition();
        })
        rect.mouseup(function(){
            if (currentState == "pressed")
                this.fill({ color: defaultGray, opacity: 0.5 })
            currentState = "depressed";
            transition();
        })
        buttonCont.click(function(event){
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
        var rect = draw.rect(50, 50).fill({ color: defaultLGray, opacity: 0}).stroke({ color: defaultDarkGreen, width: 3 }).radius(10);
        var rectLabel = draw.text("");
        rectLabel.dmove("55", "7");
        var chkBoxCont = draw.group()
        chkBoxCont.add(rect);
        chkBoxCont.add(rectLabel);

        rect.mouseover(function() {
            if (!clickedState) {
                this.fill({ color: defaultGray, opacity: 0.5 });
            }
            currentState = "hover";
            transition();
        })
        rect.mouseout(function() {
            if (!clickedState) {
                this.fill({ color: defaultLGray, opacity: 0 });
            }
            currentState = "idle";
            transition();
        })
        rect.mousedown(function() {
            this.fill({ color: defaultDarkGreen, opacity: 1 });
            currentState = "pressed";
            transition();
        })
        rect.mouseup(function() {
            this.fill({ color: defaultGreen, opacity: 1 });
            currentState = "depressed";
            transition();
        })
        rect.click(function(event){
            clickedState = !clickedState;
            if (clickedState)
                this.fill({ color: defaultGreen, opacity: 1 });
            else
                this.fill({ color: defaultLGray, opacity: 0});
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
    /** 
     * @module RadioButton  
     * @description A better way to describe this would be RadioButtonGroup rather than RadioButton
    */
    var RadioButton = function() {
        // The actual radio buttons, but the programmer never directly interacts with the rButton objects themselves.
        var rButton = function(btnNum) {
            var buttonNum = btnNum;
            var clickEvent = null;
            var stateEvent = null;
            var currentState = "idle";
            var selected = false;
            var button = draw.group();
            var label = draw.text("");
            var circ = draw.circle(25).fill({ color: defaultGray, opacity: 0 }).stroke({ color: defaultDarkGreen, width: 3});

            label.dmove(30)
            button.add(circ);
            button.add(label);

            circ.mouseover(function() {
                if (!selected) {
                    this.fill({ color: defaultGray, opacity: 0.5 });
                }
                currentState = "hover";
                transition();
            })
            circ.mouseout(function() {
                if (!selected) {
                    this.fill({ color: defaultGray, opacity: 0 });
                }
                currentState = "idle";
                transition();
            })
            circ.mousedown(function() {
                this.fill({ color: defaultDarkGreen, opacity: 1 });
                currentState = "pressed";
                transition();
            })
            circ.mouseup(function() {
                this.fill({ color: defaultGreen, opacity: 1 });
                currentState = "depressed";
                transition();
            })
            circ.click(function(event) {
                toggle();
                if (clickEvent != null) {
                    clickEvent(event);
                }
            })
            function transition() {
                if (stateEvent != null) {
                    stateEvent(currentState);
                }
            }
            function toggle() {
                selected = !selected;
                if (selected) {
                    circ.fill({ color: defaultGreen, opacity: 1 });
                    selectedButton = buttonNum;
                    enforceOne(buttonNum);

                }
                else {
                    circ.fill({ color: defaultGray, opacity: 0 });
                }
            }
            return {
                move: function(x, y) {
                    button.move(x, y)
                },
                addBtnLabel: function(text) {
                    label.text(text)
                },
                // Returns the SVG button group to add into the radio button group.
                getInstance: function() {
                    return button;
                },
                onclick: function(eventHandler) {
                    clickEvent = eventHandler;
                },
                stateChanged: function(eventHandler) {
                    stateEvent = eventHandler;
                },
                // Toggles selection between true and false.
                toggleSelection: function() {
                    toggle();
                },
                // Returns true or false, depending on whether or not the button is selected.
                getState: function() {
                    return selected;
                }
            }
        }

        var clickEvent = null;
        var stateEvent = null;
        var buttonGroup = draw.group();
        var buttonArray = [];
        var buttonTracker = 0;
        var selectedButton = 0;

        // Goes through the array of radio buttons and makes sure everything is deselected except for the newly selected button.
        function enforceOne(num) {
            var i;
            for (i = 0; i < buttonArray.length; i++) {
                if (i != num && buttonArray[i].getState() == true) {
                    buttonArray[i].toggleSelection();
                }
            }
        }
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the radio button group around using x and y coordinates. 
            */
            move: function(x, y) {
                buttonGroup.move(x, y);
            },
            /**
             * @description Adds 1 more radio button to the bottom of the radio button group.
             */
            addButton: function() {
                if (buttonArray.length == 0) {
                    buttonArray.push(new rButton(buttonTracker));
                    buttonGroup.add(buttonArray[buttonArray.length - 1].getInstance())
                }
                else {
                    buttonTracker += 1;
                    buttonArray.push(new rButton(buttonTracker));
                    buttonGroup.add(buttonArray[buttonArray.length - 1].getInstance());
                    buttonArray[buttonArray.length - 1].getInstance().move(0, 30 * buttonTracker);
                }
            },
            /**
             * @description Add a text label to the right of the radio button.
             * @param {Number} num The radio button to be selected for text change, starting at 0.
             * @param {string} text The text to be added to the button.
             */
            addLabel: function(num, text) {
                buttonArray[num].addBtnLabel(text);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to click event.
             * @description Add a function to all the radio buttons that occurs on user click. 
            */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
                var i;
                for (i = 0; i < buttonArray.length; i++) {
                    buttonArray[i].onclick(eventHandler);
                }
            },
            /** 
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to all the radio buttons that occurs when widget state changes.
            */
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler;
                var i;
                for (i = 0; i < buttonArray.length; i++) {
                    buttonArray[i].stateChanged(eventHandler);
                }
            },
            /**
             * @description Returns the number of buttons in the group, starting from 0 (1 button)
             */
            countButtons: function() {
                return buttonTracker;
            }
        }
    }
    /** @module TextBox */
    var TextBox = function() {
        var clickEvent = null;
        var stateEvent = null;
        var currentState = "idle";
        var txtBoxCont = draw.group();
        var boxBorder = draw.rect(300, 300).fill({ color: "#ffffff" }).stroke( { color: defaultGreen, width: 5});
        // Working text area implementation found at: https://github.com/svgdotjs/svg.js/issues/1058
        var foreignObject = draw.foreignObject(300, 300);
        var textArea = document.createElement('textarea');
        textArea.setAttribute("rows", 20);
        textArea.setAttribute("cols", 35);
        foreignObject.add(textArea);
        txtBoxCont.add(boxBorder);
        txtBoxCont.add(foreignObject);

        txtBoxCont.mouseover(function() {
            currentState = "hover";
            transition();
        })
        txtBoxCont.mouseout(function() {
            currentState = "idle";
            transition();
        })
        txtBoxCont.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        txtBoxCont.mouseup(function() {
            currentState = "depressed";
            transition();
        })
        txtBoxCont.click(function(event) {
            if (clickEvent != null) {
                clickEvent(event);
            }
        })
        function transition() {
            if (stateEvent != null) {
                stateEvent(currentState);
            }
        }
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
             */
            getText: function() {
                return textArea.value
            },
            /**
             * @description  Add a function to the text box that occurs when the user clicks on it.
             * @param {Function} eventHandler Function to be attached to click event.
             */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /**
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to the text box that occurs when the widget state changes.
             */
            stateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
    /** @module ScrollBar */
    var ScrollBar = function() {
        var currentState = "idle";
        var clickEvent = null;
        var clickDirection = "idle";
        var stateEvent = null;
        var scrollGroup = draw.group();
        var scrollBackground = draw.rect(20, 300).fill({ color: defaultLGray }).radius(5);
        var scrollBar = draw.rect(20, 30).fill({ color: defaultDarkGreen, opacity: 1 }).radius(5).dmove(0, 120);

        var scrollUp = draw.rect(20, 20).fill({ color: defaultGray }).radius(5);
        var scrollDown = draw.rect(20, 20).fill({ color: defaultGray }).radius(5).dmove(0, 280);
        var arrowUp = draw.polygon("0,0,5,10,10,0").dmove(5, 285);
        var arrowDown = draw.polygon("5,0,10,10,0,10").dmove(5, 5);

        var clickAreaUp = draw.rect(20, 20).fill({ opacity: 0 }).radius(5);
        var clickAreaDown = draw.rect(20, 20).fill({ opacity: 0 }).radius(5).dmove(0, 280);

        scrollGroup.add(scrollBackground).add(scrollBar).add(scrollUp).add(scrollDown).add(arrowUp).add(arrowDown).add(clickAreaUp).add(clickAreaDown);

        scrollBackground.mouseover(function() {
            currentState = "hover";
            transition();
        })
        scrollBackground.mouseout(function() {
            currentState = "idle";
            transition();
        })
        scrollBackground.mousedown(function() {
            currentState = "pressed";
            transition();
        })
        scrollBackground.mouseup(function() {
            currentState = "depressed";
            transition();
        })
        scrollBackground.click(function(event) {
            scrollBar.cy(event.y);
            if (scrollBar.cy() - 15 < scrollUp.cy() + 10) {
                scrollBar.cy(scrollUp.cy() + 25);
            }
            else if (scrollBar.cy() + 15 > scrollDown.cy() - 10) {
                scrollBar.cy(scrollDown.cy() - 25);
            }
            if (clickEvent != null) {
                clickEvent(event);
            }
        })
        scrollBar.mouseover(function() {
            currentState = "bar hover";
            transition();
        })
        scrollBar.mouseout(function() {
            currentState = "idle";
            transition();
        })

        clickAreaUp.mouseover(function() {
            scrollUp.fill({ color: defaultGreen })
            currentState = "up hover";
            transition();
        })
        clickAreaUp.mouseout(function() {
            scrollUp.fill({ color: defaultGray })
            currentState = "idle";
            transition();
        })
        clickAreaUp.mousedown(function() {
            scrollUp.fill({ color: defaultDarkGreen })
            currentState = "up pressed";
            transition();
        })
        clickAreaUp.mouseup(function() {
            scrollUp.fill({ color: defaultGreen })
            currentState = "up depressed";
            transition();
        })
        clickAreaUp.click(function(event) {
            if (scrollUp.cy() + 10 < scrollBar.cy() - 15) {
                scrollBar.dmove(0, -10);
            }
            if (scrollBar.cy() - 15 < scrollUp.cy() + 10) {
                scrollBar.cy(scrollUp.cy() + 25);
            }
            else if (scrollBar.cy() + 15 > scrollDown.cy() - 10) {
                scrollBar.cy(scrollDown.cy() - 25);
            }
            if (clickEvent != null) {
                clickEvent(event);
            }
            clickDirection = "moved up";
            clicked();
        })

        clickAreaDown.mouseover(function() {
            scrollDown.fill({ color: defaultGreen });
            currentState = "down hover";
            transition();
        })
        clickAreaDown.mouseout(function() {
            scrollDown.fill({ color: defaultGray });
            currentState = "idle";
            transition();
        })
        clickAreaDown.mousedown(function() {
            scrollDown.fill({ color: defaultDarkGreen });
            currentState = "down pressed";
            transition();
        })
        clickAreaDown.mouseup(function() {
            scrollDown.fill({ color: defaultGreen })
            currentState = "down depressed";
            transition();
        })
        clickAreaDown.click(function(event) {
            if (scrollDown.cy() - 10 > scrollBar.cy() + 15) {
                scrollBar.dmove(0, 10);
            }
            if (scrollBar.cy() - 15 < scrollUp.cy() + 10) {
                scrollBar.cy(scrollUp.cy() + 25);
            }
            else if (scrollBar.cy() + 15 > scrollDown.cy() - 10) {
                scrollBar.cy(scrollDown.cy() - 25);
            }
            if (clickEvent != null) {
                clickEvent(event);
            }
            clickDirection = "moved down";
            clicked();
        })

        function transition() {
            if (stateEvent != null) {
                stateEvent(currentState);
            }
        }
        function clicked() {
            if (clickEvent != null) {
                clickEvent(clickDirection)
            }
        }
        return {
            /**
             * @param {Number} x The new x coordinate.
             * @param {Number} y The new y coordinate.
             * @description Move the scrollbar around using x and y coordinates. 
            */
            move: function(x, y) {
                scrollGroup.move(x, y);
            },
            /** 
             * @param {Function} eventHandler Function to be attached to state event. 
             * @description Add a function to the scrollbar that occurs when widget state changes.
            */
            stateChanged: function(eventHandler) {
                stateEvent = eventHandler;
            },
            /** 
             * @param {Function} eventHandler Function to be attached to click event.
             * @description Add a function to the scrollbar that occurs on user click. 
            */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            }
        }
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
        var bar = draw.rect(wdth, 30).fill({ color: defaultLGray }).stroke({ color: defaultDarkGreen, width: 3 }).radius(5);
        var progress = draw.rect(increVal, 30).fill({ color: defaultDarkGreen }).radius(5);

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
        var response = draw.text("Click the Magic8Ball");
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