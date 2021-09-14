

const arr = [956,14,6,121,1,135,46,7,8,0,7,957];

const sortStandard = (arr, left, right) => {
    // 基准值
    const x = arr[left];
    let s = left;
    let e = right;

    // 从两边开始找基准位
    // 大的值扔左边
    // 小的值扔右边
    while (s < e) {

        // 比基准值大，不处理
        // 可能出现的情况，s，e 最小都为 0
        while (s < e && arr[e] > x) {
            e--;
        }

        // 第一次：到这里走不下，值将不会发生变动
        // 到最后赋值的时候，赋回原来的

        // 赋值
        if (s < e) {
            arr[s] = arr[e];
        }

        // 比基准值小，不处理 （这里要加个等于处理，避免相同值，导致死循环）
        // 可能出现的情况，s，e 最大都为 (arr.length - 1)
        while (s < e && arr[s] <= x) {
            s++;
        }

        // 第一次：到这里走不下
        // 到最后赋值的时候，纯粹是取两个值进行交换

        // 赋值
        if (s < e) {
            arr[e] = arr[s];
        }
    }

    arr[s] = x;

    return s;
}


const quickSort = (arr, left, right) => {
    const start = left || 0;
    const end = typeof right === 'undefined' ? (arr.length - 1) : right;

    if (start < end) {
        const index = sortStandard(arr, start, end);
        quickSort(arr, start, index - 1);
        quickSort(arr, index + 1, end);
    }

    return arr;
}

quickSort(arr);

