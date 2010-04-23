A Set data type with the following methods.

  + add
  + clear
  + copy
  + contains
  + difference
  + differenceUpdate
  + foreach
  + intersection
  + intersectionUpdate
  + isDisjoint
  + isSubset
  + isSuperset
  + remove
  + size
  + symmetricDifference
  + union
  + unionUpdate
  	
  still need to add:
  fromList  (to instantiate from a list)
  toList    (to makes a list)
  

 example:

 var set1 = new Set()
 var set2 = new Set()
 set1.add(1).add(2).add(3)
 set2.add(3).add(4).add(5)

 set1.union(set2)        => Set<1, 2, 3, 4, 5>
 set1.intersection(set2) => Set<3>

 see tests.js for more examples
