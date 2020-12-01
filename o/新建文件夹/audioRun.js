
const innerAudioContext = wx.createInnerAudioContext();
const queueArr = [];
let isPlay = false;
let time = null;

innerAudioContext.title = `开箱提醒`;
innerAudioContext.onError((res) => {
    console.log('报错', res);
    isPlay = false;
    team();
});
innerAudioContext.onEnded((res) => {
    console.log('播放完成');
    isPlay = false;
    team();
});


// 队列播放
const team = () => {
    console.log('执行 team');
    if (isPlay) return;
    const url = queueArr.shift();
    if (!url) return;
    play(url);
};

// 播放
const play = (url) => {
    console.log('执行 play');
    isPlay = true;

    innerAudioContext.src = url;
    innerAudioContext.play();
    if (time) {
        clearTimeout(time);
        time = null;
    }
    time = setTimeout(() => {
        isPlay = false;
    }, 2000);
};

// 执行函数
const audioRun = async (url) => {
    const arr = Array.isArray(url) ? url : [url];
    queueArr.push(...arr);
    team();
};


export default audioRun;
