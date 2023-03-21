let eEditor = document.getElementById('editor');
let eResult = document.getElementById('editor-result');

eEditor.oninput = function(e) {
	eResult.innerHTML = eEditor.innerText.replaceAll('\n', "<br>");
	formatElement(eResult);
	formatElement(eResult);

	var eSolutions = eResult.getElementsByClassName('solution');
	for (var i = 0; i < eSolutions.length; i++) {
		let s = eSolutions[i];
		s.onclick = function(e) {
			s.setAttribute("show", Math.round(s.getAttribute('show') == 0));
		}
		s.setAttribute("show", 0);
	}
}

eEditor.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
});

eEditor.onkeydown = function(e) {
	console.log(e);
	if(e.ctrlKey) {
		if(e.code == "KeyB") {
			insertTag('b');
    		e.preventDefault();
		}
		if(e.code == "KeyI") {
			insertTag('i');
    		e.preventDefault();
		}
		if(e.code == "KeyU") {
			insertTag('u');
    		e.preventDefault();
		}
		if(e.code == "KeyS") {
			insertTag('s');
    		e.preventDefault();
		}
	}
}

function shortkeys(key) {
	if(key == 'B') insertTag('b');
	if(key == 'I') insertTag('i');
	if(key == 'U') insertTag('u');
	if(key == 'S') insertTag('s');
	if(key == 'SUB') insertTag('sub');
	if(key == 'SUP') insertTag('sup');
	if(key == 'H1') insertTag('h1');
	if(key == 'H3') insertTag('h3');
	if(key == 'TASK') {
		insertText(`\n<task><question><b>Задача:</b>\n`,`\n</question>\n<answer>\n<b>Решение:</b>\n\n</answer>\n</task>`)
	}
}

function insertText(before, after) {
	let selection = window.getSelection();
	let range = selection.getRangeAt(0);
	console.log(selection);
	let s = range.startOffset;
	let e = range.endOffset;
    // range.collapse(true);

	// let frag = range.extractContents();
    // console.dir(frag);
	eEditor.innerText = eEditor.innerText;

	let text = eEditor.innerText;

	text = text.substring(0, s) + before + text.substring(s, e) + after + text.substring(e, text.length);

	// console.log(frag);
	eEditor.innerText = text;

	range.setStart(eEditor.firstChild, s+before.length);
	range.setEnd(eEditor.firstChild, e+before.length);
}   

function insertTag(tag) {
	insertText(`<${tag}>`,`</${tag}>`);
}

function insertHtmlAtSelectionEnd() {

	eEditor.insertAdjacentHTML("beforeBegin", "<b>")
	// var sel, range, node;
	// if (window.getSelection) {
	// 	sel = window.getSelection();
	// 	if (sel.getRangeAt && sel.rangeCount) {
	// 		range = window.getSelection().getRangeAt(0);
	// 		range.collapse(isBefore);
	// 		// Range.createContextualFragment() would be useful here but was
	// 		// until recently non-standard and not supported in all browsers
	// 		// (IE9, for one)
	// 		var el = document.createElement("div");
	// 		el.innerHTML = html;
	// 		var frag = document.createDocumentFragment(), node, lastNode;
	// 		while ( (node = el.firstChild) ) {
	// 		    lastNode = frag.appendChild(node);
	// 		}
	// 		range.insertNode(frag);
	// 	}
	// } else if (document.selection && document.selection.createRange) {
	// 	range = document.selection.createRange();
	// 	range.collapse(isBefore);
	// 	range.pasteHTML(html);
	// }
}