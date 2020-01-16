
<template>
     <GChart
    type="ColumnChart"
    :data="chartData"
    :options="chartOptions"
  />
</template>
<script>

import { GChart } from 'vue-google-charts';

export default {
 
  props: {
    chartData: {
      type: Object,
      required: true
    }, 
    chartOptions: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cities: [],
      departments: [],
      cityID: -1,
      departmentID: -1
    };
  }
};
</script>