function rangeFilter() {
  return function (items, params) {

    const attr = Object.keys(params)[0];
    let min = Object.values(params)[0][0];
    let max = Object.values(params)[0][1];

    const range = [];

    min=parseFloat(min),
    max=parseFloat(max);

    for (let i=0, l=items.length; i<l; ++i){
      const item = items[i];
      if(item[attr]<=max && item[attr]>=min) range.push(item);
    }
    return range;
  };
}

export default rangeFilter;
