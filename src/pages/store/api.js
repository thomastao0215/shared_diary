import zx from 'weapp-zx';

export function fetchData(options = {}) {
  const {
    limit, offset, keyWord, tab
  } = options;
  return zx.find('product', {
    limit,
    offset,
    fn: q => {
      const q1 = zx.getQuery();
      keyWord && q1.contains('title', keyWord);
      const q2 = zx.getQuery();
      keyWord && q2.contains('description', keyWord);
      const q3 = zx.getQuery();
      keyWord && q3.contains('salary', keyWord);
      const orQuery = zx.Query.or(q1, q2, q3);

      tab && q.in('tags', [tab]);
      q.compare('status', '=', '上架');

      const andQuery = zx.Query.and(q, orQuery);
      return andQuery;
    },
  });
}
