var Card = {
	template: `
	<div
			:id="id"
			class="card"
			:draggable="draggable"
			@dragstart="dragStart"
			@dragover.stop
	>
	<slot />
	</div>
	`,
      props: ['id', 'draggable'],
      methods: {
      		dragStart: e => {
      			let target = e.target
      			if(e.target.href){
      				target = e.target.parentNode
      			}
      			e.dataTransfer.setData('card_id', target.id)


      			setTimeout(() => {
      					target.style.display = 'none'
      			}, 0)
      		}
      }
    }