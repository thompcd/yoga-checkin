<script>
  import Month from './Month.svelte';
  import { dayDict } from './lib/dictionaries';
  import { getMonths, areDatesEquivalent } from './lib/helpers';
  import { keyCodes, keyCodesArray } from './lib/keyCodes';
	import {
    format
  } from 'date-fns';

  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const today = new Date();

  let popover;

  let monthFormat = "MMM";
  let yearFormat = "yyy";
  export let start = new Date(1987, 9, 29);
  export let end = new Date(2020, 9, 29);
  export let selected = today;
  export let dateChosen = false;
  export let trigger = null;
  export let selectableCallback = null;
  export let initDate;

  let highlighted = today;
  let shouldShakeDate = false;
  let shakeHighlightTimeout;
  $: month = today.getMonth();
  $: year = today.getFullYear();
  let formattedMonth;
  let formattedYear;
  // let year = format(today, 'yyyy')
  // export let month = format(today, 'MMM')

  let isOpen = false;
  let isClosing = false;

  today.setHours(0, 0, 0, 0);

  function assignmentHandler(formatted) {
    if (!trigger) return;
    trigger.innerHTML = formatted;
  }

  $: months = getMonths(start, end, selectableCallback);

  let monthIndex = 0;
  $: {
    monthIndex = 0;
    for (let i = 0; i < months.length; i += 1) {
      if (months[i].month === month && months[i].year === year) {
        monthIndex = i;
      }
    }
  }
  $: visibleMonth = months[monthIndex];

  $: visibleMonthId = year + month / 100;
  $: lastVisibleDate = visibleMonth.weeks[visibleMonth.weeks.length - 1].days[6].date;
  $: firstVisibleDate = visibleMonth.weeks[0].days[0].date;
  $: canIncrementMonth = monthIndex < months.length - 1;
  $: canDecrementMonth = monthIndex > 0;

  export let formattedSelected;
  $: {
    // formattedSelected = formatDate(selected, format);
    formattedSelected = format(selected, 'MM/dd/yyyy');
  }

  onMount(() => {
    month = initDate.getMonth();
    year = initDate.getFullYear();
    formattedMonth = format(month, monthFormat);
    formattedYear = format(year, yearFormat);
    console.log("init date", initDate);
    console.log("month", month);
    console.log("year",year);
    console.log("formatyear", formattedYear);
  });

  function getDefaultHighlighted() {
    return new Date(selected);
  }

  function incrementDayHighlighted(amount) {
    highlighted = new Date(highlighted);
    highlighted.setDate(highlighted.getDate() + amount);
    if (amount > 0 && highlighted > lastVisibleDate) {
      return incrementMonth(1, highlighted.getDate());
    }
    if (amount < 0 && highlighted < firstVisibleDate) {
      return incrementMonth(-1, highlighted.getDate());
    }
    return highlighted;
  }

  function getDay(m, date) {
    for (let i = 0; i < m.weeks.length; i += 1) {
      for (let j = 0; j < m.weeks[i].days.length; j += 1) {
        if (areDatesEquivalent(m.weeks[i].days[j].date, date)) {
          return m.weeks[i].days[j];
        }
      }
    }
    return null;
  }

  function checkIfVisibleDateIsSelectable(date) {
    const day = getDay(visibleMonth, date);
    if (!day) return false;
    return day.selectable;
  }

  function shakeDate(date) {
    clearTimeout(shakeHighlightTimeout);
    shouldShakeDate = date;
    shakeHighlightTimeout = setTimeout(() => {
      shouldShakeDate = false;
    }, 700);
  }

  function assignValueToTrigger(formatted) {
    assignmentHandler(formatted);
  }

  function registerSelection(chosen) {
    if (!checkIfVisibleDateIsSelectable(chosen)) return shakeDate(chosen);
    // eslint-disable-next-line
    // close();
    selected = chosen;
    dateChosen = true;
    assignValueToTrigger(formattedSelected);
    return dispatch('dateSelected', { date: chosen });
  }

  function handleKeyPress(evt) {
    if (keyCodesArray.indexOf(evt.keyCode) === -1) return;
    evt.preventDefault();
    switch (evt.keyCode) {
      case keyCodes.left:
        incrementDayHighlighted(-1);
        break;
      case keyCodes.up:
        incrementDayHighlighted(-7);
        break;
      case keyCodes.right:
        incrementDayHighlighted(1);
        break;
      case keyCodes.down:
        incrementDayHighlighted(7);
        break;
      case keyCodes.pgup:
        incrementMonth(-1);
        break;
      case keyCodes.pgdown:
        incrementMonth(1);
        break;
      // case keyCodes.escape:
      //   // eslint-disable-next-line
      //   close();
      //   break;
      case keyCodes.enter:
        registerSelection(highlighted);
        break;
      default:
        break;
    }
  }

</script>

<div class="datepicker" class:open="{isOpen}" class:closing="{isClosing}">
  <div class="calendar">
  {format(initDate, 'MMMM yyyy')}
  <div class="legend">
    {#each dayDict as day}
    <span>{day.abbrev}</span>
    {/each}
  </div>
  <Month {visibleMonth} {selected} {highlighted} {shouldShakeDate} {start}
  {end} id={visibleMonthId} on:dateSelected={e => registerSelection(e.detail)} />
  </div>
</div>

<style>
  .datepicker {
    display: inline-block;
    margin: 0 auto;
    text-align: center;
    overflow: visible;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  .calendar {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    user-select: none;
    width: 100vw;
    padding: 1rem 0;
  }

  @media (min-width: 480px) {
    .calendar {
      height: auto;
      width: 340px;
      max-width: 100%;
    }
  }

  .legend {
    color: #4a4a4a;
    padding: 10px 0;
    margin-bottom: 5px;
  }

  .legend span {
    width: 14.285714%;
    display: inline-block;
    text-align: center;
  }
</style>
