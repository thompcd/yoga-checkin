<script>
	export let text = "";
	export let link = "#";
</script>

<button class="thar-three">
	<!-- <a href="{link}">{text}</a> -->
	{text}
</button>

<style>

.thar-three {
	color: #000;
	cursor: pointer;
	display: block;
	position: relative;
	border: 2px solid #FF5CAD;
	transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}
.thar-three:hover {
	color: #fff !important;
	background-color: transparent;
	text-shadow: nthree;
}
.thar-three:hover:before {
	left: 0%;
	right: auto;
	width: 100%;
}
.thar-three:before {
	display: block;
	position: absolute;
	top: 0px;
	right: 0px;
	height: 100%;
	width: 0px;
	z-index: -1;
	content: '';
	color: #000 !important;
	background: #FF5CAD;
	transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1) 0s;
}

</style>