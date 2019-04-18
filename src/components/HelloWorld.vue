<template>
  <div>
    <publicHeader title='标题'></publicHeader>
    {{select_language_title}}
  </div>
</template>

<script>
  import publicHeader from '../components/public_header.vue';
  export default {
    name: 'HelloWorld',
    data() {
      return {

      }
    },
    components: {
      publicHeader
    },
    computed: {
      select_language_title() {
        let select_language_title = this.$t('select_language_title');
        return select_language_title;
      }
    },
    created() {
      this.toast.success("success");
      console.log('md5-test:::' + this.$md5('hello'));
    }
  }
</script>

<style scoped>
</style>