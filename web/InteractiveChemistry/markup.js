
function formatAll() {
	var toFormat = document.getElementsByClassName('markup');
	for (var i = 0; i < toFormat.length; i++) {
		let html = toFormat[i].innerHTML;
		html = format(html);
		toFormat[i].innerHTML = html;
		// remove.classList.remove('markup');
	}
}

let formatElement = function(e) {
	let html = e.innerHTML;
	html = format(html);
	console.log(format(html));
	e.innerHTML = html;
}

formatAll();

function removeDisallowed(element) {
	const allowedTags = ['B', 'I', 'U', 'SUP', 'SUB', 'H1', 'H3', 'QUESTION', 'ANSWER', 'STRUCTURE'];
	let eChildren = element.children;
	for (var i = 0; i < eChildren.length; i++) {
		let tag = eChildren[i].tagName;
		removeDisallowed(eChildren[i]);
		if(!allowedTags.includes(tag)) {
			console.log('removed tag: ' + tag);
			element.removeChild(eChildren[i]);
		}
	}
}

function format(html) {

	let element = document.createElement('formatter');
	element.innerHTML = html;

	removeDisallowed(element);
	// Chemistry formulas

	let eStructures = element.getElementsByTagName('structure');
	for (var i = 0; i < eStructures.length; i++) {
		let newText = "";
		let text = eStructures[i].innerText;
		text = text.replaceAll('-&gt;', '\u279C');
		text = text.replaceAll('/\\', '\u2191');
		let isFormula = false;
		let isSub = false;
		let isSup = false;
		for (var j = 0; j < text.length; j++) {
			let char = text.charAt(j);
			if(char == '_') {
				isSub = !isSub;
				if(isSub) {
					newText += "<sub>";
				} else {
					newText += "</sub>";
				}
				continue;
			}
			if(char == '^') {
				isSup = !isSup;
				if(isSup) {
					newText += "<sup>";
				} else {
					newText += "</sup>";
				}
				continue;
			}
			newText += char;
		}
		eStructures[i].innerHTML = newText;
	}
	return element.innerHTML;
}