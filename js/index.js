const wait=async (ms,fn=null,...args)=>{
	if(fn===null)
		fn=()=>{}
	return new Promise(resolve=>{
		window.setTimeout(resolve.bind(fn,...args),ms)
	})
}
class CarouselManager{
	constructor(root,enter_func,delay=1000,exit_func){
		if(root){
			this.paginations=[]
			this.elements=Array.from(root.childNodes).filter(elem=>{
				//elem.nodeName!='#text'
				if(elem.classList){
					if(elem.classList.contains('carousel-controls'))
						this.paginations.push(elem)
					return elem.classList.contains('carousel-item')
				}
				return false
			})
			let pagination_counter=0
			console.log(this.paginations)
			this.paginations[0].childNodes[3].childNodes.forEach(e=>{
				if (e.classList){
					if (e.classList.contains('prev')) this.prevButton = e;
					if (e.classList.contains('next')) this.nextButton = e;
				}
			})
			this.paginations=Array.from(this.paginations[0].childNodes[1].childNodes).filter(e=>{
				if(e.classList){
					if(e.classList.contains('dot')){
						e.setAttribute('data-index',pagination_counter++)
						return true
					}
				}
				return false
			})
			this.curr=0
			this.anim=null
			this.delay=delay
			this.enter=enter_func
			this.exit = exit_func ? exit_func : enter_func
			this.nextIndex = () => (this.curr + 1) % this.elements.length
			this.play_state=0//just a stupid numbering system: 0 for not yet started (or stopped), 1 for currently playing, 2 for paused.
			// this.enter(this.elements[0],this.paginations[0])
		}
	}
	start(){
		this.paginations.forEach(element => {
			const random=()=>{
				this.pause()
				this.change(element.getAttribute('data-index'))
			}
			element.onclick=random
			element.addEventListener('click',random)
		})
		const next=()=>{
			this.pause()
			this.change(this.nextIndex())
		}
		const prev=()=>{
			this.pause()
			this.change((this.curr == 0 ? this.elements.length: this.curr) - 1)
		}
		if(this.prevButton)this.prevButton.addEventListener('click', prev)
		if(this.nextButton)this.nextButton.addEventListener('click', next)
		const __internal_step=async ()=>{
			if(this.play_state==1){
				this.change(this.nextIndex())
				await wait(this.delay)
				this.anim=window.requestAnimationFrame(__internal_step)
			}
		}
		if(this.play_state==0||this.play_state==2){
			this.play_state=1
			this.anim=window.requestAnimationFrame(__internal_step)
		}
	}
	change(i){
		this.exit(this.elements[this.curr],this.paginations[this.curr])
		this.curr=Number(i)
		this.enter(this.elements[this.curr],this.paginations[this.curr])
	}
	stop(){
		change(0)
		this.play_state=0
		window.cancelAnimationFrame(this.anim)
	}
	pause(){
		if(this.play_state==1){
			this.play_state=2
			window.cancelAnimationFrame(this.anim)
		}
	}
	resume(){
		if(this.play_state==2||this.play_state==0)
			wait(this.delay).then(this.start())
	}
}
let carmgr=new CarouselManager(gebi('heroCarousel'),(carousel_item,pagination_item)=>{
	carousel_item.classList.add('test_cls')
	pagination_item.classList.add('line')
},3575,
(page, dot)=>{
	page.classList.add('exit')
	setTimeout(() => page.classList.remove('exit'), 500)
	page.classList.remove('test_cls')
	dot.classList.remove('line')
})
setTimeout(() => carmgr.start(), carmgr.delay)