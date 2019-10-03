<script>
	import {
    addMonths,
    differenceInCalendarWeeks,
		endOfMonth,
    startOfMonth,
    subMonths,
  } from 'date-fns';
  import InfiniteScroller from './InfiniteScroller.svelte';
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
  
  function addMonth(m){
    console.log("month",m);
    return +addMonths(m, 1);
  }
</script>

<InfiniteScroller
  {itemHeight}
  minItemHeight={calcMonthHeight(4)}
  initial={startOfMonth(initialMonth)}
  prev={month => subMonths(month, 1)}
  next={month => addMonths(month, 1)}
  boundsHeight={boundsHeight}
  boundsWidth={boundsWidth}
>
  <div class="card" slot="item" let:item={month}>
    <Datepicker {month}
    format = {dateFormat}
    start={this.prev} 
    end={this.next}
    initDate={month}
    >
    </Datepicker>
    <!-- <Month {m} height={itemHeight(m)} /> -->
  </div>
</InfiniteScroller>

<style>
    .card{
        -webkit-box-shadow: 16px 16px 10px -16px rgba(0,0,0,1);
        -moz-box-shadow: 16px 16px 10px -16px rgba(0,0,0,1);
        box-shadow: 16px 16px 10px -16px rgba(0,0,0,1);
    }
    </style>