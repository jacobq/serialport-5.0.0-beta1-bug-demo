const SerialPort = require('serialport');

let sp = new SerialPort("COM5", {
	baudRate: 921600,
	dataBits: 8,
	stopBits: 1,
	parity: "none"
}, (error) => {
	console.log("Port opened", error);
    // When using v4.x there seems to be no problem, but with 5.0.0-beta1
    // if data is received the following output will appear (and 'data' callback does not fire):
    // TypeError: undefined is not a function

    let delay = 10;
    console.log(`Will close port in ${delay} seconds`);		
    setTimeout(() => {
        console.log('setTimeout callback');
        sp.close((error) => {
            console.log('Close callback', error);
            console.log('About to call process.exit()');
            process.exit();
        });
    }, delay*1000);

    
    // This code is not needed to demonstrate the bug
    /*
	sp.on('data', (data) => {

        // Never gets here
		console.log("[Rx]: " + JSON.stringify(data));		
	});
    */
    
    
    // This code is not needed to demonstrate the bug
    /*
	sp.write('Go ahead send me something now', (error) => {
		console.log("Write callback", error);
		sp.drain((error) => {
			console.log('Drain callback', error);
		});
	});
    */
});
