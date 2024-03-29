const button = document.querySelector('.nav__button')
const list = document.querySelector('.list')

button.addEventListener('click', function (event){
	event.stopPropagation()
	list.classList.toggle('list__hidden')
})

window.addEventListener('click', function (event){
	event.stopPropagation()
	list.classList.add('list__hidden')
})