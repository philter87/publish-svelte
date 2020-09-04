<script lang="ts">
    import first from 'lodash/first';
    export let name: string = 'Philip';
    console.log('Lodash dependency', first([1,2,3,4]))
</script>

<p>Hello {name}</p>
