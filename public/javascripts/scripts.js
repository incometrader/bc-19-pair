window.onload = function windowLoad() {
	var link;
  var config = {
		apiKey: "AIzaSyDr7zT513OZY1RTSfOcSbCLMWOwFKe0Ecc",
		authDomain: "bc-19-pair.firebaseapp.com",
		databaseURL: "https://bc-19-pair.firebaseio.com",
		storageBucket: "bc-19-pair.appspot.com",
		messagingSenderId: "1046714437336"
  };

	firebase.initializeApp(config);

	// FirebaseUI config.
	var uiConfig = {
		// Query parameter name for mode.
		'queryParameterForWidgetMode': 'mode',
		// Query parameter name for sign in success url.
		'queryParameterForSignInSuccessUrl': 'signInSuccessUrl',
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		'signInFlow': 'popup',
		'signInSuccessUrl': '/pair',
		'signInOptions': [
			// Leave the lines as is for the providers you want to offer your users.
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		// Terms of service url.
		'tosUrl': '/',
		'callbacks': {
			'signInSuccess': function (currentUser, credential, redirectUrl) {
				window.localStorage.user = currentUser;
				// Do something.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			}
		}
	};

	if (window.location.pathname === '/login' && window.localStorage.user) {
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		// The start method will wait until the DOM is loaded.
		ui.start('#firebaseui-auth-container', uiConfig);
	}
	// // do stuff based on login staus
  // if( window.localStorage.user) {

	// } else {

	// }
	// check if user is signed in
	firebase.auth().onAuthStateChanged(function (user) {
		window.localStorage.user = user;
	});
  // assign this function to signout button click
  // firebase.auth().signOut().then(function() {
	// 	window.localStorage.user = undefined;
	// 	console.log('Signed Out');
	// }, function(error) {
	// 	console.error('Sign Out Error', error);
	// });

	function firePadInit() {
		// Get Firebase Database reference.
		var firepadRef = getExampleRef(); 
		
		//// Create ACE
		var editor = ace.edit("firepad-container");
		editor.setTheme("ace/theme/monokai");
		editor.$blockScrolling = Infinity;
		var session = editor.getSession();
		session.setUseWrapMode(true);
		session.setUseWorker(false);
		session.setMode("ace/mode/javascript");
		// Create Firepad.
		var firepad = Firepad.fromACE(firepadRef, editor, {
			defaultText: '// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}'
		});
		document.getElementById('pairURL').href = link;
    document.getElementById('pairURL').innerHTML = link;
	}


	// Helper to get hash from end of URL or generate a random one.
	function getExampleRef() {
		var ref = firebase.database().ref();
		var hash = window.location.hash.replace(/#/g, '');
		if (hash) {
			ref = ref.child(hash);
			link = window.location;
		} else {
			ref = ref.push(); // generate unique location.
			link = window.location; // add it as a hash to the URL.

			window.location = '/pair' + '#' + ref.key;
		}

		if (typeof console !== 'undefined') {
			console.log('Firebase data: ', ref.toString());
		}
		return ref;
	}

	if (window.location.pathname.indexOf('/pair') !== -1) {
		if (window.localStorage.user ){
			firePadInit();
		} else {
			window.location.href = "http://www.google.com";
		
		}
	}

	document.getElementById("signout-nav").addEventListener("click", signOut);
	function signOut(){
		firebase.auth().signOut().then(function() {
			window.localStorage.user = undefined;
			console.log('Signed Out');
		}, function(error) {
			console.error('Sign Out Error', error);
		});
	}
	


};
