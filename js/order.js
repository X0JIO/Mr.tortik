'use strict'

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form')
	form.addEventListener('submit', formSend)

	async function formSend(e) {
		e.preventDefault()

		let error = formValidate(form)

		let formData = new FormData(form)
		formData.append('image', formImage.files[0])
	

		if (error === 0){
			const TOKEN = "7139377796:AAGNNlGON112wHDCxL0El2V6c5B4tR3mUeY";
			//https://api.telegram.org/bot7139377796:AAGNNlGON112wHDCxL0El2V6c5B4tR3mUeY/getUpdates
			const CHAT_ID = "-1002000516013";
			const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
	
			document.getElementById('form').addEventListener('submit',function(e){
				 e.preventDefault(); 
	
				 let message = 
				 `<b> Имя: </b> ${this.name.value} 
				 \n<b> Телефон: </b> ${this.Phone.value} 
				 \n<b> Вид десерта: </b> ${this.cake.value} 
				 \n<b> Начинка: </b> ${this.ingredients.value}
				 \n<b> Фото: </b> ${this.image.value}`;
	
				 axios.post(URI_API,{
						 chat_id: CHAT_ID,
						 parse_mode: 'html',
						 text: message
				 })
			})
			form.addEventListener('submit', (e) => {
				// действия с данными
				e.preventDefault();
				e.target.reset(); // очищаем форму
			})
		}
	}
	
	function formValidate(form){
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++){
			const input = formReq[index];
			formRemoveError(input);

			if (input.value === ''){
				formAddError(input);
				error++;
			}
		}
		return error;
	}
	function formAddError(input){
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}
	function formRemoveError(input){
		input.parentElement.classList.remove('_error')
		input.classList.remove('_error')
	}
	

	const formImage = document.getElementById('formImage')
	const filePreview = document.getElementById('filePreview')

	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0])
	})

	function uploadFile(file){

		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)){
			alert('Разрешены только изображения!')
			formImage.value = ''
			return
		}
		// if (file.size > 2 + 1024 + 1024){
		// 	alert('Файл должен быть менее 2 МБ')
		// 	return
		// }

		var reader = new FileReader()
		reader.onload = function (e) {
			filePreview.innerHTML = `<img src='${e.target.result}' alt='photo'>`
		}
		reader.onerror = function (e) {
			alert('Ошибка')
		}
		reader.readAsDataURL(file)
		
 	}
})