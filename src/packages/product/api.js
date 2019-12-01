import zx from 'weapp-zx';

export function fetchData(id) {
  return zx.get('product', id, {
    expand: ['brand']
  }).then(res => {
    return res;
  });
}
