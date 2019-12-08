<script>
    import NestedComponent from './NestedComponent.svelte';
    import FalseComponent from '../FalseComponent.svelte';
    import AnotherNestedSvelteComponent from './NestedFolder/AnotherNestedSvelteComponent.svelte';
    export let aName = 'Parent';
</script>

<p>{aName} Component</p>
<NestedComponent/>
<AnotherNestedSvelteComponent/>
<FalseComponent/>
