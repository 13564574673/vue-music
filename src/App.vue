<template>
  <div id="app">
    <headers></headers>
    <tab></tab>
    <router-view/>
  </div>
</template>
<script>
import Headers from 'components/header/Header'
import Tab from 'components/tab/Tab'

export default {
  name: 'App',
  components: {
    Headers,
    Tab
  }
}
</script>
<style lang="scss" scoped>

</style>
