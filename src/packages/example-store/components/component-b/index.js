import { storeMixin } from 'shared/utils/store';

Component({
  behaviors: [
    storeMixin({
      mapStore: ['user', 'num']
    })
  ],
  methods: {
    onTap() {
      // 调用 action 中定义的方法将 num 减 1
      this.$dispatch('SUB_NUM');
    }
  }
});
