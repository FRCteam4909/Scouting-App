///////////////////////////////////////////////////////////////////////////////
//////////////////////                                 ////////////////////////
//////////////////////           INITIALIZATION        ////////////////////////
//////////////////////                                 ////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Track all Application Intervals
var intervals = {},

// Framework7
// - Initialize app and store it to myApp variable for futher access to its methods
	f7App = new Framework7(),
	
// Cordova
	app = {
		// Application Constructor
		initialize: function(){
			document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
			
			intervals.isSending = setInterval(function(){
				dataTransfer.isSending(config, function(isSending){
					if(isSending)
						$(".navbar-fixed").removeClass("theme-green").addClass("theme-red");
					else
						$(".navbar-fixed").removeClass("theme-red").addClass("theme-green");
				});
			}, config.interval);
			
			configureForm();
		},

		onDeviceReady: function(){
			// deviceready Event Handler
			// - Bind any cordova events here. Common events are:
			//     'pause', 'resume', etc.
		}
	};

// Initalize Cordova Application
app.initialize();