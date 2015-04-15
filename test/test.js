var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var ClassMaker = require("ClassMaker");
describe('Test ClassMaker', function () {

    function Animal(name) {

        this.name = name||"Undefined Animal";
        this.getAbility = function () {
            return "I can run";
        };
        this.whoAreYou = function () {
            return "I am " + this.name + ", " + this.getAbility()
        }
    }

    it('Test create instance of class', function (done) {
        var Dog = ClassMaker.extend(new Animal("Dog"));
        assert.typeOf(Dog, 'function');
        done();
    });

    it('Test adding members', function (done) {
        var Dog = ClassMaker.extend(new Animal("Dog"));
        var dog = new Dog;
        var animalDog = new Animal("Dog");
        for(var member in animalDog) {
            //assert.typeOf((member in dog), true);
            (member in dog).should.equal(true);
        }
        done();
    });

    it("Test call parent's method", function (done) {
        var Dog = ClassMaker.extend(new Animal("Dog"));
        var BiteDog = Dog.extend({
            whoAreYou: function() {
                return this._super()+ ", and bite"; //call parent method
            }
        });
        biteDog = new BiteDog();
        biteDog.whoAreYou().should.equal("I am Dog, I can run, and bite");
        //assert.equal(dog.getAbility, 'function');
        done();
    });
});