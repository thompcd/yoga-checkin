<script>
	import { format } from 'date-fns';

	export let m;
	export let height;
</script>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<div style={`height: ${height}px;`}>
	{format(m, 'MMM yyyy')}
</div>
