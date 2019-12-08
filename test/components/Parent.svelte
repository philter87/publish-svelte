<script>
    import Nested from './Nested.svelte';
    import NestedInFolder from './SubFolder/NestedInFolder.svelte';
    export let aName = 'Parent';
</script>

<p>{aName} Component</p>
<Nested/>
<NestedInFolder/>
