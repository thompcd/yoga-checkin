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

//datepicker vars
  let dateFormat = '#{l}, #{F} #{j}, #{Y}';
    
  function addMonth(m){
    console.log("month",m);
    return +addMonths(m, 1);
  }

  function dateSelected(event) {
        const { date } = event.detail;
        console.log('Successfully received Date');
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
    on:dateSelected
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