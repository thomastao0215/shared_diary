export const filterFetchData = (couponList = []) => couponList.map(coupon => {
  const {
    type, discount, amount, create_time: createTime, expired_time: expiredTime, id
  } = coupon;
  const title = type === 1 ? '爱戴小盒·专享折扣' : '爱戴小盒·礼金券';
  const valueContent = type === 1 ? discount : amount;
  const timeScope = createTime.slice(0, 10).replace(/-/g, '/') + '-' + expiredTime.slice(0, 10).replace(/-/g, '/');
  return {
    id,
    title,
    timeScope,
    valueContent,
    valueType: type,
  };
});
