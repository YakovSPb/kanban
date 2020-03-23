    var SingleTask = {
      template: `
        <div>
          <div class="popup-window">
          <div class="popup-window__inner">
            <div class="popup-window__header">
              <textarea class="popup-window__title" :value="getValue" v-model="title"></textarea>
              <router-link to="/" class="popup-window__close"><svg width="14" sheight="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#626262"/></svg></router-link>
            </div>
            <div class="popup-window__body">
              <textarea placeholder="Описание" :value="getTitle" v-model="desc"></textarea>
            </div>
            <div class="pupup-window__footer">
              <div 
                @click="submitAddTask"
                class="popup-window__btn"
                >Сохранитиь
             </div>
             <div 
              @click="deliteTask"
              class="popup-window__btn popup-window__btn-close"
              >Удалить
             </div>
            </div>



               </div>
          </div>
          
        </div>
      `,
          data() {
        return {
          title: '',
          desc: ''
        }
      },
      methods:{
        submitAddTask (){
          const newTask = {
            id: this.$route.params.id,
            title: this.title,
            desc: this.desc
          }
          if(this.title !==''){
           this.$store.dispatch('editeDesc', newTask)
           this.$router.push('/')          
          } else(alert('Название задачи не может быть пустым'))

        },
        deliteTask (){
           const deleteId = {
             id: this.$route.params.id
           }
           this.$store.dispatch('deliteTask', deleteId)
           this.$router.push('/')
        }
      },
      computed: {
        task () {
          return this.$store.getters.getSingleTask(this.$route.params.id)
        },
        getValue() {
          return this.title = this.task.title
        },
        getTitle(){
          return this.desc = this.task.desc
        }
      }
    }
