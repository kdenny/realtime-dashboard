<template>
  <div class="data-visualisation-tab dashboard-tab">
    <div class="row">
      <div class="col-md-6">
        <div class="chart-container">
          <vuestic-chart v-bind:data="donutChartData" type="donut"></vuestic-chart>
        </div>
      </div>
      <div class="col-md-6" v-if="countryData">
        <data-table :apiMode="apiMode"
                    :data="countryData"
                    :tableFields="table1Fields"
                    :itemsPerPage="itemsPerPage"
                    :onEachSide="onEachSide"
                    :paginationPath="paginationPath">
        </data-table>
        <data-table :apiMode="apiMode"
                    :data="regionData"
                    :tableFields="table2Fields"
                    :itemsPerPage="itemsPerPage"
                    :onEachSide="onEachSide"
                    :paginationPath="paginationPath">
        </data-table>
        <data-table :apiMode="apiMode"
                    :data="cityData"
                    :tableFields="table3Fields"
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
    name: 'geography-tab',
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
        table1Fields: FieldsDef.table1Fields,
        table2Fields: FieldsDef.table2Fields,
        table3Fields: FieldsDef.table3Fields,
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
      cityData () {
        let l = this.$store.getters.formattedResult
        if (l) {
          return l['geoData.city']
        } else {
          return null
        }
      },
      regionData () {
        let l = this.$store.getters.formattedResult
        if (l) {
          return l['geoData.region']
        } else {
          return null
        }
      },
      countryData () {
        let l = this.$store.getters.formattedResult
        if (l) {
          return l['geoData.country']
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
  @import "../../../../node_modules/bootstrap/scss/variables";
  @import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";


  .vuestic-profile-card {
    margin-left: 1rem;

    @include media-breakpoint-up(md) {
      margin-top: -$tab-content-pt;
    }

    @include media-breakpoint-down(md) {
      margin-bottom: $tab-content-pt;
      margin-left: 0;
    }
  }

  .chart-container {
    padding: 0 2rem;
    height: 24rem;
  }


</style>
