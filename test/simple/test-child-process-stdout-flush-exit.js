// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.




var common = require('../common');
var assert = require('assert');
var path = require('path');

// if child process output to console and exit
if (process.argv[2] === 'child') {
  console.log('hello');
  for (var i = 0; i < 200; i++) {
    console.log('filler');
  }
  console.log('goodbye');
  process.exit(0);
} else {
  // parent process
  var spawn = require('child_process').spawn;

  // spawn self as child
  var child = spawn(process.argv[0], [process.argv[1], 'child']);

  var gotHello = false;
  var gotBye = false;

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    console.log('parent stderr: ' + data);
    assert.ok(false);
  });

  // check if we receive both 'hello' at start and 'goodbye' at end
  child.stdout.setEncoding('utf8');
  var messageSequence = 0;
  child.stdout.on('data', function (data) {
    if ((0 == messageSequence) && (data.slice(0, 6) == 'hello\n')) {
      gotHello = true;
    }
    if (data.slice(data.length - 8) == 'goodbye\n') {
      gotBye = true;
    } else {
      gotBye = false;
    }
    messageSequence++;
  });

  child.on('close', function (data) {
    assert(gotHello);
    assert(gotBye);
  });
}
