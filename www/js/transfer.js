const dataTransfer = {
	isSending: function(config, callback){
		window.plugins.simpleFile.external.list(config.sendFolder, function(files){
			if(files && files.length > 0)
				callback(true);
			else
				callback(false);
		}, dataTransfer.handleError);
	},
	
	// Sends JSON Document to Hub
	send: function(config, message){
		var data = JSON.stringify({
			// Sends Serial Number for Identification
			sender: {
				serial: device.serial	
			},

			// Core Message to Be Sent
			msg: message,

			// `CHECK` property is added and verified at receiver
			//  - utilized to ensure that JSON doc is readable and 
			//      not lost in transit
			check: "9dcec4e5sd7f890s"
		});
		
        data = dataTransfer.removeInvalidChars(data);
        
		window.plugins.simpleFile.external.write(
            config.sendFolder + dataTransfer.tempFilename(), // File Path
			data, // JSON Message
			function(){}, // Success Handler
			dataTransfer.handleError // Error Handler
		);
	},
	
	// Error Handler
	handleError: function(err){
		// Log to Console
		console.error(err);
	},
	
	// Creates Random Temporary Filename
	tempFilename: function(){
		return 'FRCS-xxxxxxxx.json'.replace(/[x]/g, function(c){
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);

			return v.toString(16);
		});
	},
    
    // Removes Invalid Characters, Such as Emojis
    // http://stackoverflow.com/a/38987183
    removeInvalidChars: function(str) {
        var ranges = [
          '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
          '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
          '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
        ];

        return str.replace(new RegExp(ranges.join('|'), 'g'), '[X]');
    }
};