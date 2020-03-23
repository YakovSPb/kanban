    var store = new Vuex.Store({
      state: {
      	tasks :JSON.parse(localStorage.getItem('tasks') || '[{"id":"1","category":"work","title":"Пример текста карточки", "desc":"Описание"},{"id":"2","category":"test","title":"Пример текста карточки2", "desc":"Описание2"},{"id":"3","category":"done","title":"Пример длинного текста карточки, да такого чтобы он вообще не поместился","desc":"Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem ", "desc":"Очень"}]')
      },
      getters: {
      	getSingleTask (state){
      		return (id) => state.tasks.find(task => task.id == id)
      	}
      },
      mutations: {
      	saveTasks (state, tasks) {
      		state.tasks = tasks
      	},
      	createTask(state, task) {
      		state.tasks.push(task)
      	},
      	editeDesc(state, newTask){
      		let tasky = state.tasks.find(task => task.id == newTask.id)
      		tasky.title = newTask.title
      		tasky.desc = newTask.desc
      		localStorage.setItem('tasks', JSON.stringify(state.tasks))
      	},
      	deliteTask(state, deleteId){
      		let indexTask = state.tasks.findIndex(task => task.id == deleteId.id)
      		state.tasks.splice(indexTask, 1)
      		localStorage.setItem('tasks', JSON.stringify(state.tasks))
      	},
      	replaceTask(state, taskDrop){
      		let tasky = state.tasks.find(task => task.id == taskDrop.id)
      		tasky.category = taskDrop.category
      		localStorage.setItem('tasks', JSON.stringify(state.tasks))
      	}
      },
      actions: {
      	createTask({commit}, task){
      		commit('createTask', task)
      	},
      	editeDesc({commit}, newTask){
      		commit('editeDesc', newTask)
      	},
      	deliteTask({commit}, deleteId){
      		commit('deliteTask', deleteId)
      	},
      	replaceTask({commit}, taskDrop){
      		commit('replaceTask', taskDrop)
      	}
      },
    })