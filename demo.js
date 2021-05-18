import {MyToolkit} from './mytoolkit.js';


// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.addLabel("Click to increase progress bar");
btn.move(400, 100);
btn.onclick(function(e){
	//console.log("A button was clicked!")
	//console.log(e);
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