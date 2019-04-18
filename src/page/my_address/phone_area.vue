<template>
	<div class="contain">
    <div class="phoneHeader">
      <publicHeader :title="$t('phone_area.title')"></publicHeader>
    </div>
		<phonePlugin></phonePlugin>
	</div>
</template>

<script>
import publicHeader from "@/components/public_header.vue";
import phonePlugin from "@/components/phone_area_plugin.vue";
export default {
  data() {
    return {};
  },
  components: {
    publicHeader,
    phonePlugin
  }
};
</script>

<style lang="scss" scoped type="text/css">
.contain {
  height: 100%;
}
.phoneHeader {
  position: fixed;
  width: 100%;
  height: 7%;
  top: 0;
  min-height: 35px;
  z-index: 1;
}
</style>
