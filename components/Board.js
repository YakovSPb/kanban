var Board = {
	template: `
  <div
      :id="id"
      class="board"
      :class="{boardAcvite: isActive}"
      @dragover.prevent
      @drop.prevent="drop"
      @dragend="fixedDrop"
  >
  <div 
  class="board__title">{{title}}</div>
  <slot />
  <div 
    @click="isActive=!isActive"
    class="board__btn"
    ><span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#626262"></path></svg></span> 
    Добавить еще одну карточку
  </div>
  <div class="board__add">
    <textarea 
    v-model="value"
    class="board__textarea" 
    placeholder="Введите текст карточки"
    ></textarea>
    <div class="board-footer">
      <div 
      @click="submitAddTask(), isActive=!isActive"
      class="board-footer__add"
      >Добавить карточку</div>
      <div 
      @click="cancelAddTask(), isActive=!isActive"
      class="board-footer__cancel"
      ><span><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#626262"/></svg></span>Отмена</div>
    </div>
  </div>
  </div>
	`,
		data() {
  			return {
          isActive: false,
          value: '',
          category: ''
  			}
      },
      props: ['title','id','isActive'],
      methods: {
        drop: function(e) {
          const card_id = e.dataTransfer.getData('card_id')
          let indexBoard = e.explicitOriginalTarget.id.split("board-")[1] | null
          const idNum = card_id.split("card-")
          const indexCard = idNum[1]
          const elCard = document.getElementById(card_id)
          let zoneOfDrop = false

          if(e.target.classList.contains('board__title')){
            zoneOfDrop = true
            indexBoard = e.target.parentNode.id.split("board-")[1]
          }

          if(e.target.classList.contains('board__btn')){
            zoneOfDrop = true
            indexBoard = e.target.parentNode.id.split("board-")[1]
          } 



          if(indexCard && indexBoard || zoneOfDrop) {
             const taskDrop = {
               id: indexCard,
               category: (indexBoard == 1) ? 'work': (indexBoard == 2) ? 'test' : 'done'
             }
              this.$store.dispatch('replaceTask', taskDrop)
               
          }  
         elCard.style.display = 'block'
        },
        fixedDrop(){
          const arrElement = document.getElementsByClassName('card')
          for(let i = 0; i<arrElement.length;i++){
            arrElement[i].style.display= 'block'
          }
        },

        cancelAddTask(){
          this.value = ''
        },
        submitAddTask() {
           const task = {
             id: this.$store.state.tasks.length + 1,
             category: (this.id == 'board-1') ? 'work' : (this.id == 'board-2') ? 'test' : 'done',
             title: this.value,
             desc: ''
           }
           this.$store.dispatch('createTask', task)
           localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks))
           this.value = ''
        }
      }
    }