# ClassMaker
This module allows you to implement inheritance for your classes.

At first get a module instance:

```javascript
var ClassMaker = require("ClassMaker");
```

`ClassMaker` has only one method: `extend`. This method takes **object** as the parameter; its fields and methods will be added to the new **class-hier**.

```javascript
var HeirClass = ClassMaker.extend(parentObject);
```

>**Note:** The `extend` method generates and returns a new class with all properties of an object that called the `extend` method and all properties of the parent object. It does **not change** the parent object or the class.

Let's show how it works.
First we describe an `Animal` class constructor:

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

And now we create a class-heir Dog:

```javascript
var Dog = ClassMaker.extend(new Animal("Dog"));
```

Please note, we have created an **instance** of the `Animal` class. Now we can create an instance of the `Dog` class. Let's do this and call method `whoAreYou`

```javascript
var Dog = ClassMaker.extend(new Animal("Dog"));
var dog = new Dog;
console.log(dog.whoAreYou());
```

```bash
> I am Dog, I can run
```

Now let's extend the `Animal` class and create a `Duck` class. For this purpose, we describe a `bird` object which extends the `Duck` class.

```javascript
var bird = {
    ability: "fly",
    getAbility: function () {
        return "I can "+ this.ability;
    }
};

var Duck = ClassMaker.extend(new Animal("Duck"));
Duck = Duck.extend(bird);

var duck = new Duck;
console.log(duck.whoAreYou());
```

```bash
> I am Duck, I can fly
```

We have added properties of the `bird` object to properties of the `Duck` class and **overrode** the `Duck` class.
We have added an `ability` field and **overrode (hidden)** parent method `getAbility` of the `Duck` class.

>**Note:** The following code does not change the `Duck` class:
 
```javascript
Duck.extend(bird);
```

The `extend` method returns a new class! It does not change the current class or the parent object!

But what should we do if we need to call the parent method? Let's see an example.

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

So, all of your parent methods are stored and you can call them using method _super() into the method body.

Good Luck!
