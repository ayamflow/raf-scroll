'use strict';

var test = require('tape');
var rafScroll = require('../index.js');

test('rAF call', function(assert) {
    // Ensure we have space enough to scroll
    document.body.style.height = window.innerHeight * 1.5 + 'px';

    rafScroll.addOnce(function(event) {
        assert.notDeepEqual(event.deltaY, 0, 'Event shouldn\'t be called if scroll hasn\'t changed.');
        assert.deepEqual(event.deltaY, 50, 'deltaY should reflect the latest change.');
        assert.end();
    });

    window.scrollTo(0, 50);
});

test('Manual call', function(assert) {
    // Ensure we have space enough to scroll
    document.body.style.height = window.innerHeight * 1.5 + 'px';

    var evPast = rafScroll.getCurrent();
    window.scrollTo(0, 50);
    var ev = rafScroll.getCurrent();
    assert.notDeepEqual(ev.deltaY, 0, 'Calling getCurrent shouldn\'t affect/reset the deltaY value.');
}, 50);