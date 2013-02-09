var treap = require('../lib/treap')
  , should = require('should');


describe('performing insertions', function() {
  var t = treap.create();

  it('inserts valid nodes without error', function() {
    (function(){
      t.insert(4, {foo: 'bar'});
    }).should.not.throw();
  });

  it('throws an error for repeat keys', function() {
    (function(){
      t.insert(9001);
      t.insert(9001);
    }).should.throw();
  });

  it('throws an error for non-numeric keys', function() {
    (function(){
      t.insert('foo');
    }).should.throw();
  });
});


describe('performing lookups', function() {
  var t = treap.create();

  for (var i=0; i < 1000; i++) {
    t.insert(i, {foo: i+1, bar: i-1});
  }

  it('finds inserted nodes', function() {
    var found = t.find(42);
    found.key.should.equal(42);
    found.data.foo.should.equal(43);
    found.data.bar.should.equal(41);
  });

  it('returns null for nonexistent keys', function() {
    var found = t.find(24601);
    should.not.exist(found);
  });

  it('performs range lookups', function() {
    var found = t.findRange(95, 100);
    found.map(function(node) {
      return node.key;
    }).should.eql([95, 96, 97, 98, 99, 100]);
  });

  it('performs rank lookups', function() {
    var found = t.findRank(10);
    found.key.should.equal(9);
  });
});


describe('performing removals', function() {
  var t = treap.create();

  for (var i=0; i < 1000; i++) {
    t.insert(i);
  }

  it('removes nodes by key', function() {
    should.exist(t.find(100));
    t.remove(100);
    should.not.exist(t.find(100));
  });

  it('removes nodes by reference', function() {
    var found = t.find(200);
    should.exist(found);
    t.remove(found);
    should.not.exist(t.find(200));
  });
});

describe('traversing', function() {
  var t = treap.create();
  var list = [];

  for (var i=0; i < 1000; i++) {
    t.insert(i);
    list.push(i);
  }
 
  it('traverses in order', function() {
    t.traverse(function(node, i) {
      node.key.should.equal(list[i]);
    })
  });
});