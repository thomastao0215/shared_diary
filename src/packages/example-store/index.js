import makeStore, { destroyStore } from './store/index';

Page({
  onLoad() {
    // 初始化store
    const store = makeStore();
    store.install(this);
  },
  onUnload() {
    // 注销store
    this.$store && this.$store.uninstall(this);
    // 销毁store
    destroyStore();
  },
});
