// Vue3 Composition API (CDN版)
// 使用するモジュールを分割代入
const { createApp, ref, onMounted, } = Vue;

const app = createApp({
  setup() {
    // 全部setup()の中に書く
    // dataがなくなってref()になる。
    const site = ref({}); // fetchして代入①
    const pages = ref([]); // fetchして代入②
    const isNavOpen = ref(false);

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
      site,
      pages,
      isNavOpen,
    }
  },
});

// コンポーネントの登録
app.component('SiteHeader', SiteHeader);
// #appにマウント
app.mount('#app');