<template>
  <div class="aspsp-select item">
    <div class="ui hidden divider"></div>
    <div class="ui tiny image">
      <img v-if="hasLogo" :src="logoUri" height="40">
    </div>
    <div class="middle aligned content">
      <div class="header">
        <a class="select-aspsp" v-on:click="selectAspsp()">{{ name }}</a>
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'aspsp-select',
  props: ['aspsp'],
  computed: {
    name() {
      return this.aspsp.name;
    },
    logoUri() {
      return this.aspsp.logoUri;
    },
    hasLogo() {
      // return this.logoUri && this.logoUri !== '';
      // todo: need to check logo URI valid on server before attempting to display
      // for now return false
      return false;
    },
    ...mapGetters(['currentScope']),
    currentScopeAccounts() {
      return this.currentScope === 'accounts';
    },
    accountsAndConsentGranted() {
      return this.currentScopeAccounts && this.aspsp.accountsConsentGranted;
    },
  },
  methods: {
    selectAspsp() {
      this.$store.dispatch('selectAspsp', this.aspsp);
      if (this.accountsAndConsentGranted) {
        this.$router.push('/accounts');
      } else {
        this.$router.push('/redirect');
      }
    },
  },
};
</script>

<style scoped>
  .aspsp-select.item {
    width: 70%;
  }
</style>
