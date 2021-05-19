import {MyToolkit} from './mytoolkit.js';


var btn = new MyToolkit.Button;
btn.addLabel("Click to increase progress bar");
btn.move(50, 50);
btn.onclick(function(e){
	console.log(e);
	prgbar.incrValue(10);
});
btn.stateChanged(function(e) {
	console.log(e);
})

var chkbx = new MyToolkit.CheckBox;
chkbx.move(50, 300)
chkbx.addLabel("Check box, but without the check")
chkbx.onclick(function(e) {
	console.log(e);
})
chkbx.stateChanged(function(e) {
	console.log(e);
})

var txtbox = new MyToolkit.TextBox;
txtbox.move(400, 50)
txtbox.stateChange(function(e) {
	console.log(e);
})
txtbox.onclick(function(e) {
	console.log(e);
})

var prgbar = new MyToolkit.ProgressBar;
prgbar.stateChanged(function(e) {
	console.log(e);
})
prgbar.progressIncrement(function(e) {
	console.log(e);
})
prgbar.setWidth(300);
prgbar.move(50, 120);

var magicBall = new MyToolkit.Magic8Ball;
magicBall.move(50, 370)
magicBall.onclick(function(e) {
	console.log(e);
})
magicBall.stateChange(function(e) {
	console.log(e);
})

var scrollBar = new MyToolkit.ScrollBar;
scrollBar.move(0, 50);
scrollBar.stateChanged(function(e) {
	console.log(e);
})
scrollBar.onclick(function(e) {
	console.log(e);
})

var radioButtons = new MyToolkit.RadioButton;
radioButtons.addButton();
radioButtons.addButton();
radioButtons.addButton();
radioButtons.addLabel(0, "Radio Button 1");
radioButtons.addLabel(1, "Radio Button 2");
radioButtons.addLabel(2, "Radio Button 3");
radioButtons.move(50, 180)
radioButtons.stateChanged(function(e) {
	console.log(e);
})
radioButtons.onclick(function(e) {
	console.log(e);
})