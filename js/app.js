const { createApp } = Vue;

createApp({
  data() {
    return {
      isNavOpen: false,
    }
  },
  watch: {
    isNavOpen(val) {
      console.log(this.$refs['nav-dialog']);
      this.$nextTick(() => {
        const dialog = this.$refs['nav-dialog'];
        if (val) {
          dialog.showModal();
        } else {
          dialog.close();
        }
      });

    }
  },
  mounted() {
    console.log(this.$refs['nav-dialog'])
  }
}).mount('#app')