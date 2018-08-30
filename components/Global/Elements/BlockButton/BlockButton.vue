<template>
  <div v-if="service === 'users'" class="columns is-mobile field has-text-centered">
    <div v-if="BlockButton">
      <div class="column control has-text-centered">
        <hc-button color="button"
          :disabled="blacklistPending"
          :isLoading="blacklistPending"
          @click="toggleBlacklist">
          <template v-if="isBlacklisted">
            <hc-icon icon="ban" :class="['icon-left', 'is-danger']" /> {{ $t('component.blacklist.buttonLabelUnblock') }}
          </template>
          <template v-else>
            <hc-icon icon="ban" class="icon-left" /> {{ $t('component.blacklist.buttonLabelBlock') }}
          </template>
        </hc-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import blacklistable from '../../../mixins/blacklistable'

  export default {
    name: 'hc-block-button',
    mixins: [blacklistable],
    props: {
      BlockButton: {
        type: Boolean,
        default: false
      },
      entity: {
        type: Object,
        required: true
      },
      service: {
        type: String, // users, organizations
        default: 'users'
      }
    },
    data () {
      return {
        connected: false,
        ready: false
      }
    },
    computed: {
      ...mapGetters({
        loggedInUser: 'auth/user'
      })
    },
    methods: {
      author(){
        return this.entity;
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "assets/styles/utilities";


</style>
