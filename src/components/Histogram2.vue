<template lang="html">

  <section class="histogram-2">
    <h1>histogram-2 Component</h1>
  </section>
  <GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script lang="js">
import { GChart } from 'vue-google-charts';
  export default  {
    name: 'histogram-2',
    chartData: {
      type: Object,
      required: true
    }, 
    chartOptions: {
      type: Object,
      required: true
    }
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  .histogram-2 {

  }
</style>
