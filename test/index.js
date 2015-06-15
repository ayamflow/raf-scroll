'use strict';

var test = require('prova');
var rafScroll = require('../index.js');
var raf = require('component-raf');

// Ensure we have space enough to scroll
document.body.style.height = window.innerHeight + 500 + 'px';

test('rAF call', function(assert) {
    rafScroll.init();
    rafScroll.addOnce(function(event) {
        assert.notDeepEqual(event.deltaY, 0, 'Event shouldn\'t be called if scroll hasn\'t changed.');
        assert.deepEqual(event.deltaY, 50, 'deltaY should reflect the latest change.');
        rafScroll.destroy();
        assert.end();
    });

    window.scrollTo(0, 50);
});

test('Manual call', function(assert) {
    rafScroll.init();
    rafScroll.add(function(){});
    window.scrollTo(0, 50);

    raf(function() {
        var ev = rafScroll.getCurrent();
        assert.notDeepEqual(ev.deltaY, 0, 'Calling getCurrent shouldn\'t affect/reset the deltaY value.');
        rafScroll.destroy();
        assert.end();
    });
});