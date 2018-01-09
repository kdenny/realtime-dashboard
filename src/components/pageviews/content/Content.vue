<template>
  <!--<div class="row">-->
  <!--<div class="col-md-12">-->
  <!--<vuestic-alert type="success" :withCloseBtn="true">-->
  <!--<span class="badge badge-pill badge-success">{{'extra.alerts.success' | translate}}</span>-->
  <!--{{'extra.alerts.successMessage' | translate}}-->
  <!--<i class="fa fa-close alert-close"></i>-->
  <!--</vuestic-alert>-->
  <!--</div>-->
  <!--</div>-->
  <div>
    <h1>Content</h1>

    <dashboard-info-widgets></dashboard-info-widgets>
  </div>

  <!--<vuestic-widget class="no-padding no-v-padding">-->
  <!--<vuestic-tabs :names="[$t('dashboard.content'), $t('dashboard.userAgent'), $t('dashboard.geography'), $t('dashboard.referral')]" ref="tabs">-->
  <!--<div :slot="$t('dashboard.content')">-->
  <!--&lt;!&ndash;<content-tab></content-tab>&ndash;&gt;-->
  <!--</div>-->
  <!--<div :slot="$t('dashboard.userAgent')">-->
  <!--&lt;!&ndash;<user-agent-tab></user-agent-tab>&ndash;&gt;-->
  <!--</div>-->
  <!--<div :slot="$t('dashboard.geography')">-->
  <!--&lt;!&ndash;<geography-tab></geography-tab>&ndash;&gt;-->
  <!--</div>-->
  <!--<div :slot="$t('dashboard.referral')">-->
  <!--&lt;!&ndash;<referral-tab></referral-tab>&ndash;&gt;-->
  <!--</div>-->
  <!--</vuestic-tabs>-->
  <!--</vuestic-widget>-->

  <!--<dashboard-bottom-widgets></dashboard-bottom-widgets>-->

  <!--</div>-->
</template>

<script>
  import VuesticWidget from '../../vuestic-components/vuestic-widget/VuesticWidget'
  import VuesticAlert from '../../vuestic-components/vuestic-alert/VuesticAlert'
  import DashboardInfoWidgets from '../DashboardInfoWidgets'
  import VuesticTabs from '../../vuestic-components/vuestic-tabs/VuesticTabs.vue'
//  import UserAgentTab from '../user-agent-tab/UserAgentTab.vue'
//  import GeographyTab from '../geography-tab/GeographyTab.vue'
//  import ReferralTab from '../referral-tab/ReferralTab.vue'
//  import ContentTab from '../content-tab/Content.vue'
  import DashboardBottomWidgets from '../DashboardBottomWidgets.vue'

  export default {
    name: 'content',
    components: {
//      ContentTab,
      VuesticWidget,
      VuesticAlert,
      DashboardInfoWidgets,
      VuesticTabs,
//      UserAgentTab,
//      GeographyTab,
//      ReferralTab,
      DashboardBottomWidgets
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../sass/_variables.scss";
</style>
