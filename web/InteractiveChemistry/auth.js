async function login() {
	var email = document.getElementById('login-email');
	var password = document.getElementById('login-password');

	var hash = await sha256(password.value);

	fetch("/login", {
  		method: "POST",
  		headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json'
 		},
		body: `${email.value} ${hash}`
	}).then((response) => {
		if(response.status == 201) {
			response.text().then(text => {
				localStorage.authToken = text;
				closeLogin();
				_login();
			})
		} else {
			response.text().then(text => {
				alert(text);
			})
		}
	});
}

const sha256 = async (input) => {
	const textAsBuffer = new TextEncoder().encode(input);
	const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = hashArray
	  .map((item) => item.toString(16).padStart(2, "0"))
	  .join("");
	return hash;
};

function _login() {
	if(localStorage.authToken == undefined) return;

	let authToken = localStorage.authToken;
	fetch("/login", {
  		method: "POST",
  		headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json'
 		},
		body: `#token=${authToken}`
	}).then((response) => {
		console.log(response);
		if(response.status == 201) {
			response.text().then(text => {
				authId = parseInt(text);
				document.getElementById('login').innerText = "Мои работы";
			})
		}
	});
}

_login();