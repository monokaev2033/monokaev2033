class Todo {
	constructor(data) {
		this.input = data.input;
		this.list = data.list;
		this.notifications = [];

		document.onkeyup = (e) => {
			if (e.keyCode == 13 && this.input.value) {
				this.append(this.input.value, this.list);
				this.input.value = '';
				this.showNotification(this.input.value);
			}
		};
	}

	append(value, list) {
		let li = document.createElement('li');
		li.appendChild(document.createTextNode(value));
		list.appendChild(li);
	}

	showNotification(value) {
		let notify = document.createElement('div');
		notify.classList.add('notification');
		notify.appendChild(document.createTextNode(`Значение: ${value} добавлено в список`));
		document.body.appendChild(notify);
		notify.style.top = (this.notifications.length * notify.offsetHeight) + 'px';
		this.notifications.push(notify);
		setTimeout(function() {
			notify.classList.add('show');
		}, 50);
		setTimeout(() => {
			notify.classList.remove('show');
			this.notifications.pop();
		}, 1000);
	}

	function sum(a) {
		return function(b) {
			a - b;
		}
	}
}


let todo = new Todo({
	input: document.querySelector('.input'),
	list: document.querySelector('.list'),
});