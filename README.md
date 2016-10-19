raf-scroll
===
A scroll event that fires only once per frame.

## Installation

`npm i raf-scroll --save`

## Usage

Every event call is sync on a `requestAnimationFrame` (raf) loop.
The triggered event contains 2 properties, `scrollY` and `deltaY`.

`rafScroll.init()`
Setup the singleton (allows to teardown/recreate at will). Needs to be called before using the lib.

`rafScroll.add(callback)`
Will call `callback` maximum once per frame, if the scroll value has changed.
An `event` will be passed containing the current `scrollY` as well as the  `deltaY`.

`rafScroll.addOnce(callback)`
Same than `add` but only trigger the event once, then automatically unbinds itself. Useful for triggering behavior when user scrolls.

`rafScroll.remove(callback)`
Unbind the listener. Passing no `callback` will unbind all previous callbacks.

`rafScroll.getCurrent()`
Manually get the `event` (containing last `scrollY`/`deltaY`). Note that you need to wait at least 1 frame to have valid values since the scroll data is read in a requestAnimationFrame.

`rafScroll.destroy()`
Clean the singleton. It will auto-restart if you call `rafScroll.init`.

## Example

```js

var rafScroll = require('raf-scroll');

rafScroll.add(function onScroll(event) {
  if (window.innerHeight + event.scrollY >= document.offsetHeight - window.innerHeight * 0.5) {
    triggerInfiniteScroll();
  }
}

```
