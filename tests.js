// run like this:
// $ node ./tests.js
// these tests require node.js
// it can be found here -> http://nodejs.org/

var sys = require("sys"),
    set = require("./set"),
    assert = require('assert');

//------------------------------------------------------
var s1 = new set.Set();
assert.ok(s1.store);

//------------------------------------------------------
s1.add(4);
assert.ok(s1.store[4] == true);

//------------------------------------------------------
var s2 = s1.clone();
assert.ok(s2);

//------------------------------------------------------
assert.equal(s1.size(), 1);
assert.equal(s2.size(), 1);

s1.add(5);
assert.equal(s1.size(), 2);
s1.add(5);
assert.equal(s1.size(), 2);

s1
    .add(6)
    .add(5);
assert.equal(s1.size(), 3);
assert.equal(s1.clone().size(), 3);

//------------------------------------------------------
// diff
s1.clear();
s1
    .add(1)
    .add(2)
    .add(3);

s2.clear();
s2
    .add(1)
    .add(2);

assert.ok(s1.difference(s2).contains(3));
assert.ok(!s1.difference(s2).contains(2));
assert.ok(!s1.difference(s2).contains(1));
assert.ok(s1.difference(s2).size() == 1);

//------------------------------------------------------
// remove
s1.clear();
s1
    .add(1)
    .add(2)
    .add(3);

assert.equal(s1.size(), 3);
s1.remove(1);
assert.equal(s1.size(), 2);

s1.add("asdf");
assert.equal(s1.size(), 3);
s1.remove("asdf");
assert.equal(s1.size(), 2);

s1.add([1,2,3,4]);
assert.ok(s1.contains([1,2,3,4]));
assert.equal(s1.size(), 3);
s1.remove([1,2,3,4]);
assert.equal(s1.size(), 2);

//-------------------------------------------------
// foreach
s1.clear();
s1
    .add(1)
    .add(2)
    .add(3);

s2.clear();
s2 = s1.foreach(
    function(x){
        return x*x;
    });
assert.ok(s2.contains(1));
assert.ok(s2.contains(4));
assert.ok(s2.contains(9));


//-------------------------------------------------
// intersection
s1.clear();
s1.add(1);

s2.clear();
s2.add(1);
s2.add(2);

var s3 = s1.intersection(s2);
assert.ok(s3.contains(1));
assert.ok(!s3.contains(2));
assert.ok(s3.size() == 1);

//-------------------------------------------------
// intersectionUpdate
s1.clear();
s1.add(1);

s2.clear();
s2.add(1);
s2.add(2);

s1.intersectionUpdate(s2);
assert.ok(s1.contains(1));
assert.ok(!s1.contains(2));
assert.ok(s1.size() == 1);


//-------------------------------------------------
// isDisjoint
s1.clear();
s1.add(1);

s2.clear();
s2.add(2);

assert.ok(s1.isDisjoint(s2));
assert.ok(s2.isDisjoint(s1));

s2.add(1);

assert.ok(!s1.isDisjoint(s2));
assert.ok(!s2.isDisjoint(s1));

//-------------------------------------------------
// isSubset
s1.clear();
s1.add(1);

s2.clear();
s2.add(2);

assert.ok(!s1.isSubset(s2));
assert.ok(!s2.isSubset(s1));

s2.add(1);

assert.ok(s1.isSubset(s2));
assert.ok(!s2.isSubset(s1));



//-------------------------------------------------
// isSuperset
s1.clear();
s1.add(1);

s2.clear();
s2.add(2);

assert.ok(!s1.isSuperset(s2));
assert.ok(!s2.isSuperset(s1));

s2.add(1);

assert.ok(s2.isSuperset(s1));
assert.ok(!s1.isSuperset(s2));
