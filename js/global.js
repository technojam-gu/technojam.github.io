const gebi=id=>document.getElementById(id)
function navigator_menu(e){
	gebi('navs').classList.toggle('show')
	console.log('I\'m clicked')
}
if (gebi('logo')) gebi('logo').addEventListener('click',navigator_menu)
function createElem(typ, content, classes, attrib) {
	var ret = document.createElement(typ);
	if (classes) {
		classes.map(c => ret.classList.add(c));
	}
	if (attrib) {
		for (a in attrib) ret.setAttribute(a, attrib[a]);
	}
	if (content) {
		if (typeof content == 'string') {
			ret.appendChild(document.createTextNode(content));
		} else {
			if (Array.isArray(content)) {
				content.map(e => ret.appendChild(e));
			} else {
				ret.appendChild(content);
			}
		}
	}
	return ret;
}
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
	  	navigator.serviceWorker.register('./js/serviceWorker.js');
	});
}