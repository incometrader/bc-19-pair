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
	var editorLink = localStorage.getItem("userAddress");
  var signInRedirect = editorLink ? editorLink : '/pair';
	var uiConfig = {
		'queryParameterForWidgetMode': 'mode',
		'queryParameterForSignInSuccessUrl': 'signInSuccessUrl',
		'signInFlow': 'popup',
		'signInSuccessUrl': signInRedirect,
		'signInOptions': [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		'tosUrl': '/',
		'callbacks': {
			'signInSuccess': function (currentUser, credential, redirectUrl) {
				localStorage.setItem("user", currentUser);
				return true;
			}
		}
	};

  if (localStorage.getItem("user") !== "undefined") {  
		if (window.location.pathname === '/pair') {
			function firePadInit() {
				var firepadRef = getExampleRef(); 
				var editor = ace.edit("firepad-container");
				editor.setTheme("ace/theme/monokai");
				editor.$blockScrolling = Infinity;
				var session = editor.getSession();
				session.setUseWrapMode(true);
				session.setUseWorker(false);
				session.setMode("ace/mode/javascript");
				var firepad = Firepad.fromACE(firepadRef, editor, {
					defaultText: '// You are now coding in Javascript!\nfunction TIA() {\n  var message = "This is Andela.";\n  console.log(message);\n}'
				});
				document.getElementById('pairURL').href = link;
				document.getElementById('pairURL').innerHTML = link;
			}

			function getExampleRef() {
				var ref = firebase.database().ref();
				var hash = window.location.hash.replace(/#/g, '');
				if (hash) {
					ref = ref.child(hash);
					link = window.location;
				} else {
					ref = ref.push();
					window.location = '/pair' + '#' + ref.key;
					link = window.location;
				}

				if (typeof console !== 'undefined') {
					console.log('Firebase data: ', ref.toString());
				}
				return ref;
			}

			function initChat(user) {
				// Get a Firebase Database ref
				var chatRef = firebase.database().ref("chat");

				// Create a Firechat instance
				var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

				// Set the Firechat user
				chat.setUser(user.uid, user.displayName);
			}

				// hide chat and code
			// document.getElementById("pair1").style.display = 'none'; 
			// document.getElementById("chat-btn").addEventListener("click", switchToChat);
			// document.getElementById("code-btn").addEventListener("click", switchToCode);
			// function switchToChat(pair1, pair2) {
    	// 	return document.getElementById(pair1).style.display = 'none';
			// }
			// function switchToCode(pair1, pair2) {
    	// 	return document.getElementById(pair2).style.display = 'none';
			// }

			

			// chat
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					initChat(user);
				}
			});
		}
	} else {
		// no user
		document.getElementById("signout-nav").style.display = 'none';
		document.getElementById("pair-nav").style.display = 'none';  
		if (window.location.pathname === '/pair') {
			window.location = '/login';
		}
	}

	if (window.location.pathname === '/login') {
		var ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', uiConfig);
	}

  // if(localStorage.getItem("user")) {
	// 	document.getElementById("login-nav").style.display = 'none';
	// 	document.getElementById("signup-nav").style.display = 'none';
	// } 

	if (window.location.pathname === '/pair') {
		if (localStorage.getItem("user")){
			firePadInit();
		} else {
			window.location.href = "/login";
			localStorage.setItem("userAddress", window.location.href);
		}
	}

	document.getElementById("signout-nav").addEventListener("click", signOut);
	function signOut(){
		firebase.auth().signOut().then(function() {
			window.localStorage.user = undefined;
			console.log('Signed Out');
			alert("You have signed out")
			window.location = "/";
		}, function(error) {
			console.error('Sign Out Error', error);
		});
	}
	
};
