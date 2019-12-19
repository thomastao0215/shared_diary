export function fetchData(parameters = {}) {
  var tableName = 'news';
  var { pageSize, pageNo, tagName } = parameters;
  // 实例化查询对象
  const query = new wx.BaaS.Query();

  // 设置查询条件（比较、字符串包含、组合等）
  query.compare('weight', '>', 0);
  query.compare('tag_name', '=', tagName);

  // 应用查询对象
  const News = new wx.BaaS.TableObject(tableName);
  return News
    .setQuery(query)
    .limit(pageSize)
    .offset(pageNo)
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
