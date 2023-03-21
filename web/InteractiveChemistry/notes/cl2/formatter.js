var toFormat = document.getElementsByClassName('structure');
for (var i = 0; i < toFormat.length; i++) {
	let html = toFormat[i].innerHTML;
	console.log(html);
	html = html.replaceAll('-&gt;', '\u279C');
	html = html.replaceAll('/\\', '\u2191');
	let newHtml = "";
	let isSub = false;
	let isSup = false;
	for (var j = 0; j < html.length; j++) {
		let char = html.charAt(j);

		if(char == '_') {
			isSub = !isSub;
			if(isSub) {
				newHtml += "<sub>";
			} else {
				newHtml += "</sub>";
			}
			continue;
		}
		if(char == '^') {
			isSup = !isSup;
			if(isSup) {
				newHtml += "<sup>";
			} else {
				newHtml += "</sup>";
			}
			continue;
		}
		newHtml += char;
	}
	toFormat[i].innerHTML = newHtml;
}
