var eInterfaceBox = document.createElement('div');
eInterfaceBox.classList = 'interface-box';

document.body.append(eInterfaceBox);

var eRestartButton = document.createElement('button');
eRestartButton.classList = 'interface-restart';
eRestartButton.onclick = function() {window.location.reload()};
eRestartButton.innerText = "Повтрорить";

eInterfaceBox.append(eRestartButton);


var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'interface.css';
head.appendChild(link);

link.onload = function() {
	eRestartButton.style.transition = `.2s ease-in-out`;
}