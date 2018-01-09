<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-6">
        <div class="chart-container">
          <vuestic-chart v-bind:data="donutChartData" type="donut"></vuestic-chart>
        </div>
      </div>
      <div class="col-md-6" v-if="pubData">
        <data-table :apiMode="apiMode"
                    :data="pubData.contentSection"
                    :tableFields="tableFields"
                    :itemsPerPage="itemsPerPage"
                    :onEachSide="onEachSide"
                    :paginationPath="paginationPath">
        </data-table>
      </div>
    </div>
  </div>
</template>

<script>
  import VuesticChart from '../../vuestic-components/vuestic-chart/VuesticChart.vue'
  import DonutChartData from './DonutChartData'
  import DataTable from '../../vuestic-components/vuestic-datatable/VuesticDataTable.vue'
  import Vue from 'vue'
  import BadgeColumn from '../../tables/BadgeColumn.vue'
//  import LocalData from '../../vuestic-components/vuestic-datatable/data/local-data'
  import FieldsDef from './fields-definition'

  Vue.component('badge-column', BadgeColumn)

  export default {
    name: 'content-tab',
    components: {
      DataTable,
      VuesticChart,
      DonutChartData
    },
    data () {
      return {
        donutChartData: DonutChartData,
        apiMode: false,
        sortFunctions: FieldsDef.sortFunctions,
        onEachSide: 1,
        tableFields: FieldsDef.tableFields,
        paginationPath: 'pagination',
        itemsPerPage: [
          {
            value: 5
          },
          {
            value: 6
          }
        ]
      }
    },
    computed: {
      pubData () {
        return this.$store.getters.formattedResult
      },
      viewCount () {
        return this.$store.getters.pageviewCount
      },
      statCards () {
        return this.$store.getters.statCards
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

  .chart-container {
    padding: 0 2rem;
    height: 24rem;
  }


</style>
