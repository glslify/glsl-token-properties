var tokenizer  = require('glsl-tokenizer/string')
var test       = require('tape')
var properties = require('./')

test('simple example', function(t) {
  var src    = 'ident.property;'
  var tokens = tokenizer(src)

  properties(tokens)

  t.plan(2)
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.data === 'ident') {
      t.ok(!token.property, 'ident is not a property')
    } else
    if (token.data === 'property') {
      t.ok(token.property, 'property is a property')
    }
  }
})

test('array indices', function(t) {
  var src    = 'ident[2]; ident[i];'
  var tokens = tokenizer(src)

  properties(tokens)

  t.plan(2)
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.data === '2') {
      t.ok(!token.property, '[2] is not a property')
    } else
    if (token.data === 'i') {
      t.ok(!token.property, '[i] is a property')
    }
  }
})

test('nested access', function(t) {
  var src    = 'ident.first.second.third;'
  var tokens = tokenizer(src)

  properties(tokens)

  t.plan(4)
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.data === 'ident') {
      t.ok(!token.property, 'ident is not a property')
    } else
    if (token.data === 'first') {
      t.ok(token.property, 'first is a property')
    } else
    if (token.data === 'second') {
      t.ok(token.property, 'second is a property')
    } else
    if (token.data === 'third') {
      t.ok(token.property, 'third is a property')
    }
  }
})
