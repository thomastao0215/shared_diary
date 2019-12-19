import zx from 'weapp-zx';

export function fetchData(id) {
  return zx.get('product', id, {
    expand: ['brand']
  }).then(res => {
    return res;
  });
}

export function fetchSku(id) {
  return zx.find('product_sku', { product: id });
}
