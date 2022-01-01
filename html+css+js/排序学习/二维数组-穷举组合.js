

const arr1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

console.time('a');
const handle = ((arr) => {
    const beInPairs = (arr1, arr2) => {
        const val = arr1.reduce((a, b) => {
            const [newArr, valArr] = a;

            valArr.forEach((c) => {
                newArr.push(b + '-' + c);
            });

            return a;
        }, [[], arr2]);

        return val[0];
    }

    let lastVal;
    for (let i = 1; i < arr.length; i++) {
        lastVal = beInPairs(lastVal || arr[0], arr[i]);
    }

    return lastVal;
})([
    [1, 2, 3],
    [4, 5, 6, 10],
    [11],
    [7, 8],
])
console.timeEnd('a');



