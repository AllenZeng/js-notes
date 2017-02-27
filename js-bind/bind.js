// 1
Function.prototype.bind = function (content) {
	// this 为调用bind方法的实际函数
	var me = this;
	var argsArray = Array.prototype.slice.call(arguments);

	return function () {
		return me.apply(content, argsArray.slice(1));
	}
}

// 2
// 增加浏览器功能嗅探
Function.prototype.bind = Function.prototype.bind || function (content) {
	// this 为调用bind方法的实际函数
	var me = this;
	var argsArray = Array.prototype.slice.call(arguments);

	return function () {
		return me.apply(content, argsArray.slice(1));
	}
}

