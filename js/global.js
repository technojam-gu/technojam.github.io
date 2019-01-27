function setFooter() {
	var footer = document.getElementsByTagName('footer')[0];
	footer.style.bottom = 'initial';
	if (footer.getBoundingClientRect().bottom <= window.outerHeight) {
		footer.style.bottom = '0';
	}
}
setFooter();
window.onresize = function () {
	setFooter();
}
const gebi=id=>document.getElementById(id)
function navigator_menu(e){
	gebi('navs').classList.toggle('show')
	console.log('I\'m clicked')
}
gebi('logo').addEventListener('click',navigator_menu)