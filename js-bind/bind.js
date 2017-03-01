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

// level 4
// 构造函数的兼容
Function.prototype.bind = Function.prototype.bind || function (context) {
	if (typeof this !== "function") {
	  throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	}

  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};
  fNOP.prototype = this.prototype;

  var bound = function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.contact(innerArgs);
    return me.apply(this instanceof fNOP ? this : context || this, finalArgs);
  }

  bound.prototype = new fNOP(); // 利用继承，继承调用函数的prototype
  return bound;
}


// ES5-shim

function isCallable(value) { 
  if (typeof value !== 'function') { 
    return false; 
  }
}

var array_concat = Array.prototype.concat;
var array_slice = Array.prototype.slice;
var array_push = Array.prototype.push;

Function.prototype.bind = Function.prototype.bind || function (that) {
  var target = this;
  if (!isCallable(target)) {
    throw new TypeError('Function.prototype.bind called on incompatible ' + target);
  }

  var args = array_slice.call(arguments, 1);
  var bound;

  var binder = function () {
    if (this instanceof bound) {
      var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));
      if ($Object(result) === result) {
        return result;
      }
      return this;
    } else {
      return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
    }
  };

  var boundLength = Math.max(0, target.length - args.length);
  var boundArgs = [];
  for (var i = 0; i < boundLength; i++) {
    array_push.call(boundArgs, '$' + i);
  }

  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

  if (target.prototype) {
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
}