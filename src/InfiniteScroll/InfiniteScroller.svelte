<script context="module">
  // Heavily inspired by https://developers.google.com/web/updates/2016/07/infinite-scroller.

  // Number of items to instantiate beyond the current view in either scroll
  // direction.
  const AHEAD = 2;
  const BEHIND = 2;

  // The number of pixels of additional length to allow scrolling to.
  const RUNOFF = 2000;
</script>

<script>
  import { onMount, tick } from 'svelte';

  // Can be a pixel value or a function which returns the value given an item
  // supplied.
  export let itemHeight;
  // Used to approximate number of items needed to fill the scroller's container.
  export let minItemHeight = itemHeight;
	// The initial item to list at the top of the scroller.
  export let initial;
  // Functions that, when supplied with a given item, return identifiers for the
	// previous and next items.
  export let prev;
  export let next;
  export let boundsHeight;
  export let boundsWidth;

  const getItemHeight = item =>
    typeof itemHeight === 'function' ? itemHeight(item) : itemHeight;

  const ahead = AHEAD;
  let behind = 0; // to be set
  let runoff = 0; // on mount

  let el;
  let clientHeight = 0;
  // "Runway" length.
  let scrollHeight = 0;
  let lastScrollTop = 0;

  // Represents the item intersecting with the top of this scroller and its
  // offset thereof.
  // The list is initially anchored to the top (offset === 0) of the first item.
  let anchor = { item: initial, offset: 0 };

  // Store of pixel heights of items visited...
  const cache = {};
	// Items attached [to the DOM].
  let stack;
  let head = 0;
  let tail = head;

  $: clientHeight, init();

  onMount(async () => {
    behind = BEHIND;
    runoff = RUNOFF;

    el.addEventListener('scroll', handleScroll);

    // Wait for the DOM to update...
    await tick();
    // ...then set the scroller's scroll position so that the initial item
    // remains at the top.
    el.scrollTop = stack[BEHIND].top;
    lastScrollTop = el.scrollTop;

    return () => el.removeEventListener('scroll', handleScroll);
  });

  let attach;
  (attach = item => {
    if (!(item in cache)) {
      const height = getItemHeight(item);

      cache[item] = height;
      scrollHeight += height;
    }

    return cache[item];
  })(initial); // attach the initial item

  const unshift = (recycle = false) => {
    const nextSibling = stack[head];
    const item = prev(nextSibling.item);
    const { top: bottom } = nextSibling;

    console.log("unshift item", item);
    attach(item);

    const first = { item, top: bottom - cache[item], bottom };

    if (recycle) {
      head = tail;
      tail = tail === 0 ? stack.length - 1 : tail - 1;
      stack[head] = first;
    } else {
      stack = [first, ...stack];
      tail += 1;
    }
  };

  const push = (recycle = false) => {
    const previousSibling = stack[tail];
    const item = next(previousSibling.item);
    const { bottom: top } = previousSibling;

    console.log("push item", item);
    attach(item);

    const last = { item, top, bottom: top + cache[item] };

    if (recycle) {
      tail = head;
      head = head === stack.length - 1 ? 0 : head + 1;
      stack[tail] = last;
    } else {
      stack = [...stack, last];
      tail += 1;
    }
  };

  const init = () => {
    // Reset...
    const top = runoff + anchor.offset;
    head = tail = 0;
    stack = [{ item: anchor.item, top, bottom: top + cache[anchor.item] }];

    // Construct stack of attached items.
    [
      ...Array(behind + (Math.ceil(clientHeight / minItemHeight) + 1) + ahead),
    ].forEach((_, idx) => {
      switch (Math.sign(idx - behind)) {
        case -1:
          unshift();
          break;
        case 1:
          push();
          break;
        default:
          break;
      }
    });

    // Add the runoff to the runway length.
    scrollHeight = stack[tail - AHEAD].bottom + RUNOFF;
  };

  const update = delta => {
    if (!delta) return;

    let { item } = anchor;
    delta += anchor.offset;
    if (delta < 0) {
      let gain = 0;

      // We've scrolled up and intersected with a _previous_ item, but which?
      while (delta < 0) {
        unshift(/* recycle */ true);
        item = prev(item);
        delta += attach(item);
        gain += cache[stack[head].item];
      }

      if (!(prev(stack[head].item) in cache)) {
        // We've scrolled above the first item visited; reposition the stack to
        // reset the runoff.
        stack.forEach((_, idx) => {
          stack[idx].top += gain;
          stack[idx].bottom += gain;
        });
        el.scrollTop += gain;
      }
    } else {
      // We could be scrolling in either direction; regardless, update offset
      // and -- if we've scrolled the anchor out of view -- sync with the new
      // item.
      while (delta > 0 && cache[item] < delta) {
        push(/* recycle */ true);
        delta -= cache[item];
        item = next(item);
      }
    }

    anchor = { item, offset: delta };
  };

  const handleScroll = () => {
    const delta = el.scrollTop - lastScrollTop;

    update(delta);
    lastScrollTop = el.scrollTop;
  };
</script>

<style>
  ul {
		position: absolute;
    padding: 0;
    margin: 0;
    overflow-y: scroll;
    list-style: none;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
  ul::-webkit-scrollbar { 
      display: none;  
  }
	
	li {
		position: absolute;
		width: 100%;
	}
  
	li{
    padding: 0;
    background-color: #f5f5f5;
  }
	.sentinel {
	  position: absolute;
		width: 1px;
		height: 1px;
	}
</style>

<ul bind:this={el} bind:clientHeight style="height: {boundsHeight};width:{boundsWidth};">
  <!-- "Runway", governing the container's overall scroll height -- empty so as
       to avoid thrashing the GPU. -->
  <div class="sentinel" style="transform: translate(0, {scrollHeight}px);" />

  {#each stack as { item, top }, idx (idx)}
    <li style="transform: translateY({top}px);">
      <slot name="item" {item} />
    </li>
  {/each}
</ul>
