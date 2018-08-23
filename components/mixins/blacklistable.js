import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentUserSettings: 'feathers-vuex-usersettings/current',
      blacklistPending: 'feathers-vuex-usersettings/isPending'
    }),
    isBlacklisted () {
      let { blacklist } = this.currentUserSettings
      return blacklist && blacklist.includes(this.author()._id)
    }
  },
  methods: {
    async toggleBlacklist () {
      let message
      try {
        await this.$store.dispatch('feathers-vuex-usersettings/toggleBlacklist', this.author())
        const translationKey = `component.blacklist.${this.isBlacklisted ? 'blockSuccess' : 'unblockSuccess'}`
        message = this.$t(translationKey, {
          name: this.author().name || this.$t('component.contribution.creatorUnknown')
        })
      } catch (error) {
        console.log(error)
        message = String(error)
      }
      this.$snackbar.open({ message })
    }
  }
}
