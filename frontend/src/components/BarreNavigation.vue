<template>
    <a :href="url">{{ text }}</a>
</template>

<script>
export default {
  name: 'BarreNavigation',
  props: ['url', 'text']
}
</script>

<style>
a {
  padding: 20px;
}

</style>