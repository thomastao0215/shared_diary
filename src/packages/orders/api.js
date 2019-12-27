export function fetchData(parameters = {}) {
  var tableName = 'order';
  var {
    limit, offset, userId, status
  } = parameters;
  // 实例化查询对象
  const query = new wx.BaaS.Query();

  // 设置查询条件（比较、字符串包含、组合等）
  query.compare('user_id', '=', userId);
  if (status) {
    query.compare('status', '=', status);
  }


  // 应用查询对象
  const Orders = new wx.BaaS.TableObject(tableName);
  return Orders
    .setQuery(query)
    .limit(limit)
    .offset(offset)
    .find();
}

export function getOrderProdcuts(parameters = {}) {
  var tableName = 'order_item';
  var { orderId } = parameters;
  // 实例化查询对象
  const query = new wx.BaaS.Query();

  // 设置查询条件（比较、字符串包含、组合等）
  query.compare('order_id', '=', orderId);

  // 应用查询对象
  const OrderItems = new wx.BaaS.TableObject(tableName);
  return OrderItems
    .setQuery(query)
    .find();
}

/**
 * 获取轮播图配置
 */
export function getSwipers() {
  const tableName = 'swiper';
  const query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  const swiper = new wx.BaaS.TableObject(tableName);
  return swiper
    .setQuery(query)
    .orderBy('-weight')
    .find();
}

export function getTags() {
  const tableName = 'tag';
  const query = new wx.BaaS.Query();
  query.compare('weight', '>', 0);
  const Tags = new wx.BaaS.TableObject(tableName);
  return Tags
    .setQuery(query)
    .orderBy('-weight')
    .find();
}

export function getPageInfo() {
  const tableName = 'page';
  const Page = new wx.BaaS.TableObject(tableName);
  return Page.find();
}
