<svelte:options tag="svelte-simple"/>

<script>
  import { createEventDispatcher } from 'svelte';

  export let name1 = 'a ';
  export let name2='Phi lip';
  export    let     name3  =  'Philip123?#"¤'    ;
  export let name4  = 'null' ;
  export let name5 = 1;
  export const name6 = 2;
  export let name7;

  const dispatch = createEventDispatcher();
  function sayHello() {
  		dispatch('message', {
  			text: 'Hello!'
  		});
  	}
</script>

<p>Hello {name1}</p>
<p>Hello {name2}</p>
<p>Hello {name3}</p>
<p>Hello {name4}</p>
<p>Hello {name5}</p>

<button on:click={sayHello}>
	Click to say hello
</button>