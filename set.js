/*  A set object for javascript.
 *  Derek Rhodes, physci@gmail.com
 *
 *  under the terms of either the MIT License or the GNU General Public License (GPL) Version 2.

 + add
 + clear
 + copy
 + contains
 + difference
 + differenceUpdate
 + foreach
 + fromArray
 + intersection
 + intersectionUpdate
 + isDisjoint
 + isSubset
 + isSuperset
 + remove
 + size
 + symmetricDifference
 + toArray
 + union
 + unionUpdate
*/

Set = function(){
    this.store = {};
    this.length__ = 0;
    this.cachedArray__ = [];
};

Set.prototype.add = function(val){
    if (!this.contains(val)){
        this.store[val] = true;
        this.length__ += 1;
        if(this.cachedArray__ !== null) this.cachedArray__.push(val);
    }
    return this;
};

Set.prototype.fromArray = function(arr){
    // instantiate a set given an array
    for (var el in arr){
        this.add(arr[el]);
    }
    this.cachedArray__ = arr;
    return this;
};

Set.prototype.toArray = function(){
    if(this.cachedArray__ !== null) return this.cachedArray__;

    // push all the elements from the set into an array if it isn't cached
    var arr = [];
    for (var el in this.store){
        arr.push(el);
    }
    this.cachedArray__ = arr;
    return arr;
}

Set.prototype.clear = function(){
    // removes all elements from the set.
    this.store = {};
    this.length__ = 0;
    this.cachedArray__ = null;
    return this;
};

Set.prototype.contains = function(val){
    // return true is this set contains val.
    return (val in this.store);
};

Set.prototype.copy = function(){
    // returns a shallow copy of a set.
    var temp = new Set();
    for (var el in this.store){
        temp.add(el);
    }
    return temp;
};

Set.prototype.clone = function(){
    // return a clone of a set.
    // this function stolen from ConroyP @ stackoverflow
    // http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-a-javascript-object
    function clone(obj){
        if(obj == null || typeof(obj) != 'object'){
            return obj;
        }

        var temp = obj.constructor();

        for(var el in obj){
            temp[el] = clone(obj[el]);
        }

        return temp;
    };

    var clonedSet = new Set();
    clonedSet.length__ = this.length__;
    clonedSet.store = clone(this.store);
    return clonedSet;
};

Set.prototype.size = function(){
    // returns the number of elements contained in the set
    return this.length__;
};


Set.prototype.difference = function(other){
    // Return the difference of this set and the other
    // i.e. all elements that are in this set but not the other
    var diff = new Set();
    for (var el in this.store){
        if (!other.contains(el)){
            diff.add(el);
        }
    }
    return diff;
};

Set.prototype.remove = function(el){
    // Remove an element from a set;
    if (el in this.store){
        delete this.store[el];
        this.length__ -= 1;
    }
    // Don't bother remove from the cached array, just clear it
    this.cachedArray__ = null;
    return this;
};

Set.prototype.differenceUpdate = function(other){
    // Remove all elements of the other set from this set.
    for( var el in other.store ){
        this.remove(el);
    }
    return this;
};

Set.prototype.foreach = function(fn){
    // apply fn to each el and return as set containing the result of each application.
    var result = new Set();
    for( var el in this.store ){
        result.add( fn(el) );
    }
    return result;
};

Set.prototype.intersection = function(other){
    // returns a set which contains elements common to this and the other
    var result = new Set();
    for (var el in this.store){
        if (other.contains(el)){
            result.add(el);
        }
    }
    return result;
};

Set.prototype.intersectionUpdate = function(other){
    // mutates this set to contain only elements common to this and the other
    for (var el in this.store){
        if (!other.contains(el)){
            this.remove(el);
        }
    }
    return this;
};

Set.prototype.isDisjoint = function(other){
    // return true if two sets have a null intersection.
    return this.intersection(other).size() === 0;
};

Set.prototype.isSubset = function(other){
    // return true if every element in this set is contained in other
    for( var el in this.store ){
        if (!other.contains(el)){
            return false;
        }
    }
    return true;
};

Set.prototype.isSuperset = function(other){
    // return true if this every element in other is contained in this
    return other.isSubset(this);
};

Set.prototype.symmetricDifference = function(){
    // return elements unique to both sets.
    return this.union(other).difference(this.intersection(other));
};

Set.prototype.union = function(other){
    // return a set containing all elements from both sets.
    var result = this.clone();
    for (var el in other.store){
        result.add(el);
    }
    return result;
};

Set.prototype.unionUpdate = function(other){
    // return a set containing all elements from both sets.
    for (var el in other.store){
        this.add(el);
    }
    return this;
};

Set.prototype.toString = function(){
    var result = [];
    var limit = 10;
    for (var el in this.store){
        result.push(el.toString());

        limit -= 1;
        if( limit <= 0){
            result.push("...");
            break;
        }
    }
    return "Set<"+ result.join(", ") + ">";
};


try {
    exports.Set = Set;
} catch(err){}
