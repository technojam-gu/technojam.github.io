const gebi=id=>document.getElementById(id)
function navigator_menu(e){
	gebi('navs').classList.toggle('show')
}
if (gebi('logo')) gebi('logo').addEventListener('click',navigator_menu)

var handleFooterPos = () => {
	function tagHeight(s) {
		return document.getElementsByTagName(s)[0].getBoundingClientRect().height;
	}
	if ((tagHeight('article') + tagHeight('footer') + 70) < window.innerHeight) { // article margin
		document.getElementsByTagName('footer')[0].style.bottom = '0';
	} else {
		document.getElementsByTagName('footer')[0].style.bottom = null;
	}
}
const gebtn = tag => document.getElementsByTagName(tag);
var handleNavScroll = () => {
	if (window.scrollY > 50) {
		gebtn('nav')[0].classList.remove('navTransparent');
	} else {
		gebtn('nav')[0].classList.add('navTransparent');
	}
}
handleFooterPos();
window.addEventListener('resize', handleFooterPos);
handleNavScroll();
window.addEventListener('scroll', handleNavScroll);

var crEl = (typ, content, classes, attrib) => {
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
	  	navigator.serviceWorker.register('/serviceWorker.js');
	});
}