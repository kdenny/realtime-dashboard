<template>
  <div class="dashboard">
    <!--<div class="row">-->
      <!--<div class="col-md-12">-->
        <!--<vuestic-alert type="success" :withCloseBtn="true">-->
          <!--<span class="badge badge-pill badge-success">{{'extra.alerts.success' | translate}}</span>-->
          <!--{{'extra.alerts.successMessage' | translate}}-->
          <!--<i class="fa fa-close alert-close"></i>-->
        <!--</vuestic-alert>-->
      <!--</div>-->
    <!--</div>-->
    <button v-on:click="switchComposer">Click me</button>
    <button v-on:click="switchComposer">Click me</button>

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="[$t('dashboard.content'), $t('dashboard.userAgent'), $t('dashboard.geography'), $t('dashboard.referral')]" ref="tabs">
        <div :slot="$t('dashboard.content')">
          <content-tab></content-tab>
        </div>
        <div :slot="$t('dashboard.userAgent')">
          <user-agent-tab></user-agent-tab>
        </div>
        <div :slot="$t('dashboard.geography')">
          <geography-tab></geography-tab>
        </div>
        <div :slot="$t('dashboard.referral')">
          <referral-tab></referral-tab>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

    <dashboard-bottom-widgets></dashboard-bottom-widgets>

  </div>
</template>

<script>
  import VuesticWidget from '../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticAlert from '../vuestic-components/vuestic-alert/VuesticAlert'
  import DashboardInfoWidgets from './DashboardInfoWidgets'
  import VuesticTabs from '../vuestic-components/vuestic-tabs/VuesticTabs.vue'
  import UserAgentTab from './user-agent-tab/UserAgentTab.vue'
  import GeographyTab from './geography-tab/GeographyTab.vue'
  import ReferralTab from './referral-tab/ReferralTab.vue'
  import ContentTab from './content-tab/Content.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  export default {
    name: 'dashboard',
    components: {
      ContentTab,
      VuesticWidget,
      VuesticAlert,
      DashboardInfoWidgets,
      VuesticTabs,
      UserAgentTab,
      GeographyTab,
      ReferralTab,
      DashboardBottomWidgets
    },
    mounted () {
      this.$store.dispatch('openSocket')
    },
    methods: {
      switchComposer: function () {
        this.$store.dispatch('switchApp', {
          app: 'composer'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
