const f2Utils = () => {
    const f2Arr = [];
    const defaultStr = 'default';

    return {
        upData(newData, type) {
            type = type || defaultStr;

            const f2Data = f2Arr.find(ii => ii.type === type);
            f2Data.chart.changeData(newData);
        },
        clear(type) {
            type = type || defaultStr;

            const f2Data = f2Arr.find(ii => ii.type === type);
            f2Data.chart.clear();
            return f2Data;
        },
        getChart(type) {
            type = type || defaultStr;
            return f2Arr.find(ii => ii.type === type);
        },
        setChart(obj) {
            // type, chart, options
            !obj.type && (obj.type = defaultStr);
            f2Arr.push(obj);
        },
    };
}