import { storeMixin } from 'shared/utils/store';

Component({
  behaviors: [
    storeMixin({
      mapStore: ['user', 'num']
    })
  ],
  methods: {
    onTap() {
      const num = this.data.num + 1;
      // 调用 mutations 中的方法将 num 加 1
      this.$commit('CHANGE_NUM', { num });
    }
  }
});
