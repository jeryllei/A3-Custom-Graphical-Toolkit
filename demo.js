import {MyToolkit} from './mytoolkit.js';


var btn = new MyToolkit.Button;
btn.addLabel("Click to increase progress bar");
btn.move(400, 100);
btn.onclick(function(e){
	console.log(e);
	prgbar.incrValue(10);
});
btn.stateChanged(function(e) {
	console.log(e);
})

var chkbx = new MyToolkit.CheckBox;
chkbx.move(100, 400)
chkbx.addLabel("Hello")
chkbx.onclick(function(e) {
	console.log(e);
})
chkbx.stateChanged(function(e) {
	console.log(e);
})

var txtbox = new MyToolkit.TextBox;
txtbox.move(800, 10)

var prgbar = new MyToolkit.ProgressBar;
prgbar.stateChanged(function(e) {
	console.log(e);
})
prgbar.progressIncrement(function(e) {
	console.log(e);
})
prgbar.setWidth(200);
prgbar.move(200, 0);

var magicBall = new MyToolkit.Magic8Ball;
magicBall.move(100, 100)
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
radioButtons.move(500, 250)
radioButtons.stateChanged(function(e) {
	console.log(e);
})
radioButtons.onclick(function(e) {
	console.log(e);
})