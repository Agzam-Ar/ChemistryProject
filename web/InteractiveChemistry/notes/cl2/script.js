let eHeader;

eHeader = document.getElementById('header');
window.onscroll = function(e) {
	updateTitle();
}

updateTitle();

function updateTitle() {
	eHeader.classList = window.scrollY < 100 ? 'big' : 'small';
}

if(window.location.hash != "") {
	let target = document.getElementById(window.location.hash.substr(1));
	if(target != null)  {
		window.scroll({
  			top: target.offsetTop - target.offsetHeight,
  			left: 0,
  			behavior: 'smooth'
		});
	}
}

var eSolutions = document.getElementsByClassName('solution');
for (var i = 0; i < eSolutions.length; i++) {
	let s = eSolutions[i];
	s.onclick = function(e) {
		s.setAttribute("show", Math.round(s.getAttribute('show') == 0));
	}
	s.setAttribute("show", 0);
}


document.getElementById('page-visit-and-time-counter').src = 'https://www.youtube.com/embed/2utUb31aYdg?autoplay=1&mute=1&loops=-1';