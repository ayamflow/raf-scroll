'use strict';

var raf = require('component-raf');
var scrollTop = require('scrolltop');
var Emitter = require('tiny-emitter');
var emitter;
var rafId = -1;
var scrollY = 0;
var deltaY = 0;
var ticking = false;

module.exports = {
  add: function(fn) {
    if(!emitter) emitter = new Emitter();
    emitter.on('scroll', fn);

    // Start raf on first callback
    if (emitter.e.scroll.length === 1) {
      rafId = raf(update);
    }
  },

  addOnce: function(fn) {
    if(!emitter) emitter = new Emitter();
    emitter.once('scroll', fn);

    // Start raf on first callback
    if (emitter.e.scroll.length === 1) {
      rafId = raf(update);
    }
  },

  remove: function(fn) {
    emitter.off('scroll', fn);

    // Stop raf if there is no more callbacks
    if (emitter && emitter.e.scroll && emitter.e.scroll.length < 1) {
      raf.cancel(rafId);
    }
  },

  getCurrent: function() {
    return getEvent();
  },

  destroy: function() {
    raf.cancel(rafId);
    emitter.off();
    emitter = null;
    scrollY = 0;
    deltaY = 0;
  }
};

function getEvent() {
  if(ticking) {
    var scroll = scrollTop();
    deltaY = scroll - scrollY;
  }

  return {
    scrollY: scrollY,
    deltaY: deltaY
  };
}

function checkUpdate() {

}

function update() {
  rafId = raf(update);
  ticking = true;

  var event = getEvent();
  scrollY = scrollTop();

  if (event.deltaY !== 0) {
    emitter.emit('scroll', event);
  }

  ticking = false;
}
