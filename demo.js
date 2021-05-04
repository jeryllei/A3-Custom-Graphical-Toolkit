import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.addLabel("this is a cool label");
btn.move(400, 100);
btn.onclick(function(e){
	console.log("A button was clicked!")
	console.log(e);
});
