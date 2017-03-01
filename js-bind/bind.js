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

// 3
// 兼容预设传参
Function.prototype.bind = Function.prototype.bind || function (context) {
	var me = this;
	var args = Array.prototype.slice.call(arguments, 1); //相当于[].slice(1)，去掉第一个参数

	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs); // 将预设参数与新传入参数合并
		return me.apply(me, finalArgs);
	}
}
