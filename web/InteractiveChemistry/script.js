let eHeader;
let searchTags = [];
let eSearchResults;

let authId = -1;

eHeader = document.getElementById('header');
eSearchResults = document.getElementById('search-results');

window.onscroll = function(e) {
	eHeader.classList = window.scrollY < 100 ? 'big' : 'small';
}

init();

async function init() {
	let searchTagsResponse = await fetch('/generated/search-tags.txt');
	var searchTagsData = await searchTagsResponse.text();
	searchTags = searchTagsData.split('\n');
	console.log(searchTagsData);
	console.log(searchTags);
}

function openLogin() {
	if(authId == -1) {
		selectLoginBody(0);
		var loginBox = document.getElementById('login-box');
		loginBox.setAttribute("visible", 1);
	
		var eSign = document.getElementById('sign');
	} else {
		window.location.pathname = '/myworks/';
	}
}

function closeLogin() {
	var loginBox = document.getElementById('login-box');
	loginBox.setAttribute("visible", 0);
}

async function register() {
	var email = document.getElementById('register-email');
	var password = document.getElementById('register-password');
	var passwordAgain = document.getElementById('register-password-again');

	if(password.value != passwordAgain.value) {
		alert("Пароли не совпадают!");
		return;
	}

	var hash = await sha256(password.value);

	fetch("/register", {
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

function search(e) {
	var search = e.value;
	search = search.replaceAll(" ", "").replaceAll("+", "|").replaceAll("->", "|");
	let data = search.split("|");
	let results = [];
	let resultsTilte = [];
	for (var i = 0; i < data.length; i++) {
		var d = data[i];
		for (var j = 0; j < searchTags.length; j++) {
			var st = searchTags[j];
			if(st == "") continue;
			if(st.includes(d) && d != "") {
				var app = st.split('\t')[1];
				if(!results.includes(app)) {
					results.push(app);
					resultsTilte.push(st.split('\t')[2]);
				}
			}
		}
	}
	eSearchResults.innerHTML = "";

	for (var i = 0; i < results.length; i++) {
		eSearchResults.innerHTML += `<a href="interactive.html#${results[i]}">${resultsTilte[i]}</a><br>`;
	}

	console.log(results);
	eSearchResults.setAttribute("hide", (results.length == 0));
}

function selectLoginBody(id) {
	let eLb = document.getElementsByClassName('login-body');
	for (var i = 0; i < eLb.length; i++) {
		eLb[i].setAttribute("hide", 1);
	}
	let eTabs = document.getElementsByClassName('tab');
	for (var i = 0; i < eTabs.length; i++) {
		eTabs[i].setAttribute("selected", 0);
	}
	document.getElementById('login-body-' + id).setAttribute("hide", 0);
	document.getElementById('ltab-' + id).setAttribute("selected", 1);
}
