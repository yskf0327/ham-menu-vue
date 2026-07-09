// Vue3 Composition API (CDN版)
// 使用するモジュールを分割代入
const { createApp, ref, watch, onMounted, nextTick } = Vue;

createApp({
  setup() {
    // 全部setup()の中に書く

    // dataがなくなってref()になる。
    const isNavOpen = ref(false); // メニュー開閉状態管理用
    const site = ref({});
    const pages = ref([]);
    const navDialog = ref(null); // DOMを直接操作する用($refsの代わり)

    // watchはメソッドに変更。複数の状態を監視する場合はwatch自体を複数記述するなど。
    watch(isNavOpen, (val) => {
      nextTick(() => {
        const dialog = navDialog.value;
        if (!dialog) return;
        val ? dialog.showModal() : dialog.close()
      })
    });

    // ライフサイクルフックの名前が変わる(onXXXX)
    onMounted(() => {
      // デバッグ用
      console.log(navDialog.value);
    });

    // fetchはonMountedでする。
    onMounted(async () => {
      try {
        const response = await fetch('./data/site.json');
        if (!response.ok) throw new Error('サイトデータの取得に失敗しました。');
        const json = await response.json();
        pages.value = json.pages;
        site.value = json.site;
      } catch (e) {
        console.error(e);
      }
    });

    // テンプレートで扱うものはreturnしないと使えない
    return {
      isNavOpen,
      site,
      pages,
      navDialog
    }
  },
}).mount('#app')