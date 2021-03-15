<template lang="">
<view>
  <uni-calendar @change="" />
</view>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      id: (state) => state.test.id,
      message: (state) => state.test.message,
    }),
  },
};
</script>
<style>
</style>