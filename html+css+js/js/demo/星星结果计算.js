

// 星星计算
// 利用上限和下限，得出一个包含 1, 0.5, 0 的数组
function fn (length) {
    // length 星星值 3.8
    const result = []

    for (let i = 0; i < 5; i++) {
        // 递减下去
        const newVal = +(+length - i).toFixed(2);

        if (newVal <= 0.2) {
            result.push(0);
        } else if (newVal >= 0.8) {
            result.push(1);
        } else if (newVal > 0) {
            result.push(0.5);
        }
    }
    return result;
}
