var ClassMaker = require("ClassMaker");
/**
 * @constructor
 */
function Animal(name) {
  this.name = name || "Undefined Animal";
  this.getAbility = function () {
    return "I can run";
  };
  this.whoAreYou = function () {
    return "I am " + this.name + ", " + this.getAbility()
  }
}
var Dog = ClassMaker.extend(new Animal("Dog"));
var dog = new Dog;
console.log(dog.whoAreYou());
var bird = {
  ability: "fly",
  getAbility: function () {
    return "I can " + this.ability;
  }
};
var Duck = ClassMaker.extend(new Animal("Duck"));
Duck = Duck.extend(bird);
var duck = new Duck;
console.log(duck.whoAreYou());
var SwimDuck = Duck.extend({
  whoAreYou: function () {
    return this._super() + ", and swim"; //call parent method
  }
});
swimDuck = new SwimDuck;
console.log(swimDuck.whoAreYou());
