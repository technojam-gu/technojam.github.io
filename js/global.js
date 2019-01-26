const gebi=id=>document.getElementById(id)
function navigator_menu(e){
	gebi('navs').classList.toggle('show')
	console.log('I\'m clicked')
}
gebi('logo').addEventListener('click',navigator_menu)