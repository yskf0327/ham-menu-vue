const { createApp, ref, watch, onMounted, nextTick } = Vue;

createApp({
  setup() {
    const isNavOpen = ref(false);
    const navDialog = ref(null);

    watch(isNavOpen, (val) => {
      nextTick(() => {
        const dialog = navDialog.value;
        if (!dialog) return;
        val ? dialog.showModal() : dialog.close()
      })
    });

    onMounted(() => {
      console.log(navDialog.value);
    });

    return {
      isNavOpen,
      navDialog
    }
  },
}).mount('#app')