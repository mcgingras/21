require('tape')('sync on reused stream', function(t) {

  var gossip = require('../model')
  var assert = require('assert')

  var g1 = gossip(),
    g2 = gossip(),
    g3 = gossip()

  var s1 = g1.createStream(),
    s2 = g2.createStream(),
    s3 = g3.createStream()

  s1.on('data', function(d) {
    console.log("s1", d)
  })
  s2.on('data', function(d) {
    console.log("s2", d)
  })
  s3.on('data', function(d) {
    console.log("s3", d)
  })

  s1.pipe(s2).pipe(s1)

  var value = Math.random()
    value2 = Math.random()

  // console.log('value', value)
  // console.log('value2', value2)

  g1.set('key', value)

  // Test Scuttlebutts are synced
  setTimeout(function () {
    t.equal(g2.get('key'), g1.get('key'))

    // Drop socket2
    s2.end()

    // Set value offline
    g1.set('key', value2)

    // re-connect with existing stream to new scuttlebutt
    s1 = g1.createStream()
    s3 = g3.createStream()

    s1.on('data', function(d) {
      console.log("s1~", d)
    })
    s3.on('data', function(d) {
      console.log("s3~", d)
    })

    s1.pipe(s3).pipe(s1)

    setTimeout(function () {

      // should have synced the new changes.
      t.equal(g3.get('key'), g1.get('key'))

      t.end()

    }, 200)

  }, 200)

})
