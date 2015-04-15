# Extend
This module allows you to implement inheritance for your classes.

At first get instance of module
```javascript
var extend = require("Extend");
```
`Extend` has only one method `extend`. This method takes as a parameter an **object** which fields and methods will be added to the new **class-hier**
```javascript
var HeirClass = extend.extend(parentObject);
```
**Note:** Method `extend` generates and returns new class with all properties of object which called method extend and all properties of parent object. It does **not change** parent object or class.

Let's show how it works.
First we describe the class constructor `Animal`
```javascript
function Animal(name) {

    this.name = name||"Undefined Animal";
    this.getAbility = function () {
        return "I can run";
    };
    this.whoAreYou = function () {
        return "I am " + this.name + ", " + this.getAbility()
    }
}
```
And now we create class-heir Dog
```javascript
var Dog = extend.extend(new Animal("Dog"));
```
Please note, we have ceated an **instance** of class `Animal`. Now we can create an instance of class `Dog`. Let's do this and call method `whoAreYou`
```javascript
var Dog = extend.extend(new Animal("Dog"));
var dog = new Dog;
console.log(dog.whoAreYou());
```

```bash
> I am Dog, I can run
```
Now let's extend class `Animal` and create class `Duck`. For this we describe object `bird` which extends class `Duck`
```javascript
var bird = {
    ability: "fly",
    getAbility: function () {
        return "I can "+ this.ability;
    }
};

var Duck = extend.extend(new Animal("Duck"));
Duck = Duck.extend(bird);

var duck = new Duck;
console.log(duck.whoAreYou());
```
```bash
> I am Duck, I can fly
```
We have added properties of object `bird` to properties of class `Duck` and **overrode** class `Duck`.
We have added field `ability` and **overrode (hidden)** parent method `getAbility` of class `Duck`.

**Note:** Next code does not change class `Duck` 
```javascript
Duck.extend(bird);
```
Method `extend` returns new class! It does not change curent class or parent object!

But what should we do if we need to call parent method? Let's see next example.

```javascript
var SwimDuck = Duck.extend({
    whoAreYou: function() {
        return this._super()+ ", and swim"; // parent
    }
});
swimDuck  = new SwimDuck();
console.log(swimDuck.whoAreYou());
```
```bash
> I am Duck, I can fly, and swim
```
So all you parent methods are stored and you can call them using method _super() into method body.

Good Luck!
