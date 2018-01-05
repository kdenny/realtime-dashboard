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

    <dashboard-info-widgets></dashboard-info-widgets>

    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs :names="[$t('dashboard.content'), $t('dashboard.userAgent'), $t('dashboard.geography'), $t('dashboard.referral')]" ref="tabs">
        <div :slot="$t('dashboard.content')">
          <data-visualisation-tab></data-visualisation-tab>
        </div>
        <div :slot="$t('dashboard.userAgent')">
          <users-members-tab></users-members-tab>
        </div>
        <div :slot="$t('dashboard.geography')">
          <setup-profile-tab></setup-profile-tab>
        </div>
        <div :slot="$t('dashboard.referral')">
          <features-tab></features-tab>
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
  import UsersMembersTab from './users-and-members-tab/UsersMembersTab.vue'
  import SetupProfileTab from './setup-profile-tab/SetupProfileTab.vue'
  import FeaturesTab from './features-tab/FeaturesTab.vue'
  import DataVisualisationTab from './data-visualisation-tab/DataVisualisation.vue'
  import DashboardBottomWidgets from './DashboardBottomWidgets.vue'

  export default {
    name: 'pageviews',
    components: {
      DataVisualisationTab,
      VuesticWidget,
      VuesticAlert,
      DashboardInfoWidgets,
      VuesticTabs,
      UsersMembersTab,
      SetupProfileTab,
      FeaturesTab,
      DashboardBottomWidgets
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";
</style>
