

// keyof typeof 对象  可以得到该对象key的枚举值
const config = {
    广告曝光: {color: '#5470c6', key: 'Impressions', index: 0, isNum: true, formatter: (val: string | number) => val},
    广告点击: {color: '#91cc75', key: 'Clicks', index: 1, isNum: true, formatter: (val: string | number) => val},
    广告售出: {color: '#fac858', key: 'Sales', index: 2, isNum: true, formatter: (val: string | number) => val},
    总售出: {color: '#ee6666', key: 'ListingQuantitySold', index: 3, isNum: true, formatter: (val: string | number) => val},
    平均费率: {color: '#abd9ec', key: 'BidPercentageAvg', index: 4, isNum: false, formatter: (val: string | number) => `${val}%`},
};

type TConfigKey = keyof typeof config;

