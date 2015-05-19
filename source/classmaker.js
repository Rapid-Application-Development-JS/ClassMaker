(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.ClassMaker = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    module.exports = (root.ClassMaker = factory());
  } else {
    root.ClassMaker = factory();
  }
}(this, function () {
  var classMaker = (function () {
    var self = function () {
      // self
    };

    function isFunction(_function) {
      return typeof _function === 'function';
    }

    /**
     *
     * @param proto - parent object
     * @returns {Function} hier class constructor
     */
    self.extend = function (proto) {
      var nameOfMethodOrField, _constructor = function (magic) { // call initialize only if there's no magic cookie
        if (magic !== isFunction && isFunction(this.initialize)) {
          this.initialize.apply(this, arguments);
        }
      };
      _constructor.prototype = new this(isFunction); // use our private method as magic cookie
      for (nameOfMethodOrField in proto) {
        (function (newMethodOrField, originalMethodOrField) { // create a closure
          _constructor.prototype[nameOfMethodOrField] =
            !isFunction(newMethodOrField) || !isFunction(originalMethodOrField) ? newMethodOrField : // add _super method
              function () {
                this._super = originalMethodOrField;
                return newMethodOrField.apply(this, arguments);
              };
        }(proto[nameOfMethodOrField], _constructor.prototype[nameOfMethodOrField]));
      }
      _constructor.prototype.constructor = _constructor;
      _constructor.extend = this.extend || this.create;
      return _constructor;
    };
    return self;
  }());
  /*
   exports.namespace = 'RAD.Class';
   exports.module = _class;
   exports.type = 'namespace';
   */
  return classMaker;
}));
