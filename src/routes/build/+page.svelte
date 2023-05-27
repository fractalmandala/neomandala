<script lang="ts">

	import { audioStore } from '$lib/stores/modalstores';
	import {
		breakZero,
		breakOne,
		breakTwo,
		themeMode,
		windowWidth,
		scrollY
	} from '$lib/stores/globalstores';
  import '$lib/styles/design.sass'
	let audio: any;
	audioStore.subscribe((value) => (audio = value));
	let fake = false;


</script>

<div class="rta-column right00 minH">

</div>
