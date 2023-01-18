export const debounce = function(func, wait = 1000, immediate = true) {
	let timer;
	return function() {
		let context = this,
			args = arguments;
		if (timer) clearTimeout(timer);
		if (immediate) {
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, wait);
			if (callNow) func.apply(context, args);
		} else {
			timer = setTimeout(() => {
				func.apply(context, args);
			}, wait)
		}
	}
}
export const throttle = (func, wait = 1000, type = 1) => {
	let previous = 0;
	let timeout;
	return function() {
		let context = this;
		let args = arguments;
		if (type === 1) {
			let now = Date.now();

			if (now - previous > wait) {
				func.apply(context, args);
				previous = now;
			}
		} else if (type === 2) {
			if (!timeout) {
				timeout = setTimeout(() => {
					timeout = null;
					func.apply(context, args)
				}, wait)
			}
		}
	}
}
