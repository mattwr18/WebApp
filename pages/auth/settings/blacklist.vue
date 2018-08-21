<template>
  <div class="info-text">
    <h2 class="title is-3">
      {{ $t('auth.settings.blacklist') }}
    </h2>
    <p class="subtitle is-6">{{ $t('auth.settings.blacklistSubtitle') }}</p>
        <nuxt-link
            v-for="(user, index) in blacklistedUsers"
            :key="user._id"
            :to="{ name: 'profile-slug', params: { slug: user.slug }}"
            class="column user">
            {{ user.name }}
        </nuxt-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        blacklistedUsers: [],
      }
    },
    async asyncData ({store}) {
      const currentUserSettings = store.getters['feathers-vuex-usersettings/current'];
      const res = await store.dispatch('feathers-vuex-users/find', { query: {_id: { $in: currentUserSettings.blacklist } } } );
      return {
        blacklistedUsers: res.data
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
