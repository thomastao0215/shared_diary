import zx from 'weapp-zx';

export function getAddressInfo(id) {
  return zx.get('address', id);
}

export function createAddress(data) {
  return zx.get('user', 'me')
    .then(res => {
      const { id } = res.data;
      return zx.create('address', {
        ...data,
        user_id: id,
        is_delete: false
      });
    });
}

export function updateAddress(id, data) {
  return zx.update('address', id, data);
}
