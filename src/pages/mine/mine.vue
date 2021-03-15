<template lang="">
    <div>
        {{id}}
        {{message}}
    </div>
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
<style lang="">
</style>