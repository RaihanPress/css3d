//window.addEventListener('DOMContentLoaded',()=>{
(()=>{
	$ = el => {elem = typeof el === "string" ? document.querySelector(el) : el;if(elem){elem.on = function(type,listener,options) { elem.addEventListener(type,listener,options) };elem.un = function(type,listener,options) { elem.removeEventListener(type,listener,options) };elem.querySelector ? elem.$ = function(ele) {return elem.querySelector(ele) } : ()=>{}}return elem;}
	$$ = el => document.querySelectorAll(el)    
	
	$$('.panel').forEach(p=>{
		if($(p).$('.title button.close')){
			$($(p).$('.title button.close')).on('click',function(){
				p.classList.toggle("hidden");
				var h = null;
				$$('.panel').forEach(p=>{if(p.classList.contains('hidden')){h = p;}})
				console.log(h)
				if(h === null){
					$$('.panel').forEach(p=>{p.classList.remove('hidden')})
				}
			})
		}
	})


	var pos = {x:50,z:0}, scale = 1

	$('#new_btn').on('click',addItem)
	function addItem(){
		$$('.items .wrapper .item').forEach(i=>{i.classList.remove('active')})
		let item = document.createElement('div')
		item.classList = 'item active'
		item.innerHTML = `<span>item${$$('.items .wrapper .item').length+1}</span><button class="fas fa-eye-slash" title="Hide"></button><button class="fas fa-ellipsis-v" title="More"></button>`
		$('.items .wrapper').appendChild(item)
		$('.properties .title span span').innerHTML = item.textContent

		$(item).on('click',function(){
			$$('.items .wrapper .item').forEach(i=>{i.classList.remove('active')})
			item.classList.add('active')
			$('.properties .title span span').innerHTML = item.textContent
		})
	}



	function rotate(x,z){
		if(z >  360) z = z%360
		else if(z < -360) z = z%-360

		if(x >  360) x = x%360
		else if(x < -360) x = x%-360
		// console.log(scale)
		$('.ground').style.transform = `perspective(1000px) rotateX(${x}deg) rotateZ(${z}deg)`
		//`translate3d(0px,${scale*50}px,0px)`
		$('#rx').value = x ; $('#rz').value = z
		let c_pos = "User"
		if(x ===  85 && z === 0  ) { c_pos = 'Front' }
		if(x ===  85 && z === 90 ) { c_pos = 'Right' }
		if(x ===   0) { c_pos = 'Top' }
		if(x === 180) { c_pos = 'Bottom' }
		$('.pos').textContent = c_pos + ' Perspective'
	}
	var t;
	function animate(){
		clearTimeout(t)
		$('.ground').style.transition = '.3s'
		t = setTimeout(()=>{$('.ground').style.transition = ''},300)
	}
	$('.scene').on('mousedown',function(e){
		var prevX,prevY,rx,rz,valid = false
		if(e.which === 2){
			$(window).on('mousemove',move)
			$(window).on('mouseup',up)
			
			prevX = e.clientX ;  prevY = e.clientY
			function move(e){
				valid = true
				rz = (prevX - e.clientX) / 2 + pos.z
				rx = (prevY - e.clientY) / 2 + pos.x
				rotate(rx,rz)
			}
			function up(){
				if(valid){
					pos.x = rx ; pos.z = rz;
					rotate(pos.x,pos.z)
				}
				$(window).un('mousemove',move)
				$(window).un('mouseup',up)
			}
		}
	})
	function pointGround(x,y){
		$('#cube1').classList.remove('active')
		if(!$('.ground .pointer')){
			let p = document.createElement('div')
			p.classList = "pointer"
			$('.ground').appendChild(p)
		}
		$('.ground .pointer').style.left = x + 'px'
		$('.ground .pointer').style.top = y + 'px'
	}
	function pointEl(id){
		let par = $('#'+id)
		// par.querySelectorAll('div').forEach(d=>{
		// 	d.style.outline = '1px solid #caca00'
		// })
		par.classList.add('active')
	}
	$('.scene').on('contextmenu',function(e){
		e.preventDefault()
		if(e.target.classList == "ground"){
			pointGround(e.offsetX,e.offsetY)
		}
		else if(!e.target.classList.contains("scene")){
			$('.ground .pointer')?.remove()
			let par = e.target.parentNode
			pointEl(par.id)
		}
	})
	$('.scene').on('mousewheel',function(e){
		e.preventDefault()
		if(e.deltaY < 0){
			scale+=.1 ; if(scale > 4){scale = 4}
		}else{
			scale-=.1 ; if(scale < 0.1){scale = 0.1}
		}
		// rotate(pos.x,pos.z)
		// $('.scene').style.transform = `scale(${scale})`
	})
	$(window).on('keydown',function(e){
		if(e.target.tagName === "INPUT"){return}
		let k = e.key, c = e.keyCode, ct = event.ctrlKey
		// console.log(e.keyCode)
		if(e.code.includes('Numpad')){
			if(k === '1'){ pos.x = 85; pos.z = -45  }
			if(k === '3'){ pos.x = 85; pos.z = 45  }

			if(k === '2'){ pos.x = 85; pos.z = 0  }
			if(k === '4'){ pos.x = 85; pos.z = -90  }

			if(k === '6'){ pos.x = 85; pos.z = 90  }
			if(k === '8'){ pos.x = 85; pos.z = 180}

			if(k === '7'){ pos.x = 85; pos.z = 235  }
			if(k === '9'){ pos.x = 85; pos.z = 135  }

			if(k === '5' && !ct){ pos.x = 0; ;}
			if(k === '5' && ct){ pos.x = 180; ;}
			animate()
			rotate(pos.x,pos.z)
		}
		if(e.code.includes('Arrow')){
			if(c === 37){ pos.z -= 10; }
			if(c === 39){ pos.z += 10; }

			if(c === 38){ pos.x -= 10; }
			if(c === 40){ pos.x += 10; }
			rotate(pos.x,pos.z)
		}
	})

})()