const wait=async (ms,fn=null,...args)=>{
	if(fn===null)
		fn=()=>{}
	return new Promise(resolve=>{
		window.setTimeout(resolve.bind(fn,...args),ms)
	})
}
class CarouselManager{
	constructor(root,toggler_func,delay=1000){
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
			this.toggler=toggler_func
			this.play_state=0//just a stupid numbering system: 0 for not yet started (or stopped), 1 for currently playing, 2 for paused.
			// this.toggler(this.elements[0],this.paginations[0])
		}
	}
	start(){
		this.paginations.forEach(element => {
			const random=ev=>{
				this.pause()
				this.toggler(this.elements[this.curr],this.paginations[this.curr])
				this.curr=element.getAttribute('data-index')
				this.toggler(this.elements[this.curr],this.paginations[this.curr])
			}
			element.onclick=random
			element.addEventListener('click',random)
		})
		const __internal_step=async timestamp=>{
			if(!this.delta)
				this.delta=timestamp
			if(this.play_state==1){
				this.toggler(this.elements[this.curr],this.paginations[this.curr])
				this.curr++;this.curr%=this.elements.length
				this.toggler(this.elements[this.curr],this.paginations[this.curr])
				await wait(this.delay)
				this.anim=window.requestAnimationFrame(__internal_step)
			}
		}
		if(this.play_state==0||this.play_state==2){
			this.play_state=1
			this.anim=window.requestAnimationFrame(__internal_step)
		}

	}
	next(){
		this.pause()
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
		this.curr++;this.curr%=this.elements.length
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
	}
	prev(){
		this.pause()
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
		if(this.curr==0)
			this.curr=this.elements.length
		this.curr--
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
	}
	stop(){
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
		this.curr=0
		this.toggler(this.elements[this.curr],this.paginations[this.curr])
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
		if(this.play_state==2)
			wait(this.delay).then(this.start())
	}
}
let carmgr=new CarouselManager(gebi('heroCarousel'),(carousel_item,pagination_item)=>{
	carousel_item.classList.toggle('test_cls')
	pagination_item.classList.toggle('line')
},3575)
setTimeout(() => carmgr.start(), carmgr.delay)