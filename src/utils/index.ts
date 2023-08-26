/**
 * 树形分组城市列表
 */
export function SetCityGroup(cities: API.ICity[]) {
  const result: { groupName: string; groupList: API.ICity[] }[] = [];
  cities.forEach((city) => {
    // 取得首字母
    const groupName = city.pinyin.charAt(0).toUpperCase();
    // 获取这个拼音首字母的下标
    const index = result.findIndex((item) => item.groupName === groupName);
    //做判断
    if (index > -1) {
      //找到了，那就追加这一个city
      result[index].groupList.push(city);
    } else {
      //一般来说，第一次找字母，都应该找不到，那么就直接创建 初始result数组
      // result数组
      result.push({
        groupName,
        groupList: [city],
      });
    }
  });
  return result.sort((a, b) => (a.groupName > b.groupName ? 1 : -1));
}
