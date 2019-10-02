<script>
	import {
    addMonths,
    differenceInCalendarWeeks,
		endOfMonth,
    startOfMonth,
    subMonths,
  } from 'date-fns';
  import InfiniteScroller from './InfiniteScroller.svelte';
  import Month from './Month.svelte';

  export let weekHeight = 48;
  export let initialMonth = Date.now();
  export let boundsHeight = "100%";
  export let boundsWidth = "100%";

  const calcMonthHeight = weeksCount => weeksCount * weekHeight;

  const itemHeight = m =>
    calcMonthHeight(differenceInCalendarWeeks(endOfMonth(m), m) + 1);
</script>

<InfiniteScroller
  {itemHeight}
  minItemHeight={calcMonthHeight(4)}
  initial={+startOfMonth(initialMonth)}
  prev={m => +subMonths(m, 1)}
  next={m => +addMonths(m, 1)}
  boundsHeight={boundsHeight}
  boundsWidth={boundsWidth}
>
  <div slot="item" let:item={m}>
    <Month {m} height={itemHeight(m)} />
  </div>
</InfiniteScroller>
