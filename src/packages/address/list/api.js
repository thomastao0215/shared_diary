import zx from 'weapp-zx';

export function fetchData(options = {}) {
  const { limit, offset } = options;
  return zx.get('user', 'me').then(res => {
    const { id } = res.data;
    return zx.find('address', {
      limit,
      offset,
      fn: query => {
        query.compare('user_id', '=', id);
        query.compare('is_delete', '!=', true);
      },
    });
  });
}
