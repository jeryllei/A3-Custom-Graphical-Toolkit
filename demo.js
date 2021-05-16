import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.addLabel("this is a cool label");
btn.move(400, 100);
btn.onclick(function(e){
	console.log("A button was clicked!")
	console.log(e);
});

var chkbx = new MyToolkit.CheckBox;
chkbx.move(100, 400)
chkbx.onclick(function(e) {
	console.log(e);
})

var prgbar = new MyToolkit.ProgressBar;
prgbar.setValue(40);
prgbar.setWidth(200);
prgbar.incrValue(40);