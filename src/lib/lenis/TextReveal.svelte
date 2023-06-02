<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import type ScrollTriggerInstance from 'gsap/dist/ScrollTrigger'

  let text = 'Hello, world!';
  let imageSrc = 'path/to/image';

  let scrollTriggerInstance: ScrollTriggerInstance;

  onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
    gsap.set('.text-reveal', { opacity: 0 });
    gsap.set('.image-parallax', { yPercent: -20 });
    gsap.set('.image-reveal', { opacity: 0 });

    const tl = gsap.timeline();
    tl.to('.text-reveal', { duration: 1, text: text })
      .to('.text-reveal', { opacity: 1, duration: 0.5 });

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: '.image-parallax',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: self => {
        const progress = self.progress.toFixed(2);
        const scale = 1 - parseFloat(progress) * 0.2;
        gsap.to('.image-parallax', { scale: scale, duration: 0 });
      },
      markers: true // for debugging
    });

    ScrollTrigger.batch('.image-reveal', {
      onEnter: batch => gsap.to(batch, { opacity: 1, stagger: 0.1 }),
      start: 'top 80%',
    });
  });

  onDestroy(() => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  });
</script>

<div class="text-reveal"></div>

<div class="image-parallax" style="opacity: 0;">
  <img class="image-reveal" src="{imageSrc}" alt="Ithmmage">
</div>