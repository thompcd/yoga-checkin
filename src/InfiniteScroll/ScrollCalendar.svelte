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
  import Datepicker from '../Calendar/Datepicker.svelte';

  export let weekHeight = 48;
  export let initialMonth = Date.now();
  export let boundsHeight = "100%";
  export let boundsWidth = "100%";

  const calcMonthHeight = weeksCount => weeksCount * weekHeight;

  const itemHeight = 450;
  // const itemHeight = m =>
  //   calcMonthHeight(differenceInCalendarWeeks(endOfMonth(m), m) + 1);

//datepicker vars
    const today = new Date();
	let start = new Date();

    console.log("today", today)
	let dateFormat = '#{l}, #{F} #{j}, #{Y}';
  let noWeekendsSelectableCallback = (date) => date.getDay() !== 0 && date.getDay() !== 6;
   	let formattedSelected;
    let dateChosen = false;
	let exampleFormatted = false;
    let exampleChosen = false;
    let selected = new Date(); 
    	$: end = new Date(start.getTime() + 1000 * 3600 * 24 * 720);
  
    let threeDaysInPast;
	$: {
	  const date = new Date(today);
	  date.setDate(date.getDate() - 3);
	  threeDaysInPast = date;
  }
  console.log("3daysInPast", threeDaysInPast);
  	let inThirtyDays;
	$: {
	  const date = new Date(start);
	  date.setDate(date.getDate() + 30);
	  inThirtyDays = date;
  }
  console.log("30daysInFuture", inThirtyDays);
  
  
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
    <Datepicker
    format = {dateFormat}
    start={threeDaysInPast} 
    end={inThirtyDays}
    selectableCallback={noWeekendsSelectableCallback}
    >
    </Datepicker>
    <!-- <Month {m} height={itemHeight(m)} /> -->
  </div>
</InfiniteScroller>
