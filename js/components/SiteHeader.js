// コンポーネントは別ファイルにできる。
// ルートの前で読み込むこと。
const SiteHeader = {
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
    isNavOpen: {
      type: Boolean,
      default: false,
    }
  },
  // 使用するイベントは事前に登録する
  emits: ['update:isNavOpen'],
  // setupでpropsを扱う場合は引数で渡す
  setup(props) {
    // 使用するモジュールを準備
    const { ref, watch, nextTick } = Vue;
    // DOMを触る時もref()
    const navDialog = ref(null);

    // watch(監視対象,コールバック関数);
    // 監視対象がpropsの場合はgetter関数にする
    // refの場合はそのまま置ける
    watch(() => props.isNavOpen, (val) => {
      nextTick(() => {
        const dialog = navDialog.value;
        if (!dialog) return;
        val ? dialog.showModal() : dialog.close();
      });
    });

    // テンプレートで使うものはreturnする
    return {
      navDialog
    }
  },
  template: `
      <header>
      <div class="header-inner container">
        <h1 class="logo">LOGO</h1>
        <dialog id="nav-dialog" class="drawer-menu" ref="navDialog" @close="$emit('update:isNavOpen',false)">
          <div class="drawer-menu__content container">
            <header class="drawer-menu__header">
              <button class="drawer-menu__btn-close" type="button" aria-label="閉じる" aria-controls="nav-dialog"
                @click="$emit('update:isNavOpen', false)">
                <span class="btn-close__line"></span>
              </button>
            </header>
            <nav>
              <ul>
                <!-- ディレクティブやマスタッシュはVue2と同じ -->
                <li v-for="link in pages" :key="link.name"><a :href="link.path" @click="$emit('update:isNavOpen',false)">{{link.name}}</a></li>
              </ul>
            </nav>
          </div>
        </dialog>
        <button type="button" class="ham-btn" aria-label="メニュー開閉" aria-controls="nav-dialog"
          @click="$emit('update:isNavOpen',!isNavOpen)">
          <span class="ham-btn__line"></span>
        </button>
      </div>
    </header>
`
}
