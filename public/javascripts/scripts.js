window.onload = function () {
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
		'tosUrl': '/about',
		'callbacks': {
			'signInSuccess': function(currentUser, credential, redirectUrl) {
				// Do something.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			}
		}
	};

	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start('#firebaseui-auth-container', uiConfig);

// check if user is signed in
  firebase.auth().onAuthStateChanged(function(user) {
		console.log(user);
		
	});

};