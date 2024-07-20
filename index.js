
const rawCanvas = document.getElementById('raw');
const rawCanvasCtx = rawCanvas.getContext('2d');

const maskCanvas = document.getElementById('mask');
const maskCanvasCtx = maskCanvas.getContext('2d');

const newCanvas = document.getElementById('new');
const newCanvasCtx = newCanvas.getContext('2d');

const loadImage = (url = 'tu.png') => {
    const {promise, resolve} = Promise.withResolvers();
    const img = new Image();
    img.src = url;
    img.onload = () => {
        resolve(img);
    }

    return promise;
}


const initCanvas = (imgObj) => {
    let {width, height, naturalWidth, naturalHeight} = imgObj;
    width = width * 0.3;
    height = height * 0.3;

    rawCanvas.style = `width:${width}px;height:${height}px`;
    rawCanvas.width = width;
    rawCanvas.height = height;
    rawCanvasCtx.drawImage(imgObj, 0, 0, width, height);

    maskCanvas.style = `width:${width}px;height:${height}px`;
    maskCanvas.width = width;
    maskCanvas.height = height;
    // rawCanvasCtx.drawImage(imgObj, 0, 0, width, height);


    newCanvas.style = `width:${width}px;height:${height}px`;
    newCanvas.width = width;
    newCanvas.height = height;

    return {width, height};
};

const renderNewImage = () => {
    // 遮罩
    const maskPxs = maskCanvasCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    // 原图像素点
    const rawPxs = rawCanvasCtx.getImageData(0, 0, rawCanvas.width, rawCanvas.height);

    const maskData = maskPxs.data;
    const newData = new Uint8ClampedArray(maskData.length);
    const newPxs = new ImageData(newData, maskPxs.width, maskPxs.height);

    for(var i = 0; i < newData.length / 4; i++){
        const [rKey, gKey, bKey, aKey] = [4 * i, 4 * i + 1, 4 * i + 2, 4 * i + 3];
        const oldRgba = `${maskData[rKey]},${maskData[gKey]},${maskData[bKey]},${maskData[aKey]}`
        // 紫色部分
        // rgba(169, 0, 255, 1)
        if (['169,0,255,255', '168,0,255,255', '170,0,255,255'].includes(oldRgba)) {
            // console.log(rKey);
            // console.log(`${rawPxs.data[rKey]},${rawPxs.data[gKey]},${rawPxs.data[bKey]},${rawPxs.data[aKey]}`);
            newData[rKey] = rawPxs.data[rKey];
            newData[gKey] = rawPxs.data[gKey];
            newData[bKey] = rawPxs.data[bKey];
            newData[aKey] = 255;
        }
        else {
            newData[rKey] = 255;
            newData[gKey] = 255;
            newData[bKey] = 255;
            newData[aKey] = 255;
        }
    }

    // console.log(newPxs, rawPxs);
    newCanvasCtx.clearRect(0, 0, newCanvasCtx.width, newCanvasCtx.height)
    newCanvasCtx.putImageData(newPxs, 0, 0);
};

const ctxEvent = () => {
    maskCanvasCtx.lineWidth = 40;
    maskCanvasCtx.lineJoin = 'round';
    maskCanvasCtx.lineCap = 'round';
    maskCanvasCtx.strokeStyle = 'rgba(169, 0, 255, 1)';
    maskCanvasCtx.fillStyle = 'rgba(169, 0, 255, 1)';
    // maskCanvasCtx.globalAlpha = 0.5
    maskCanvas.onmousedown = (e) => {
        console.log(2);
        maskCanvasCtx.beginPath();
        maskCanvasCtx.moveTo(e.clientX - maskCanvas.offsetLeft, e.clientY - maskCanvas.offsetTop);
        maskCanvasCtx.lineTo(e.clientX - maskCanvas.offsetLeft, e.clientY - maskCanvas.offsetTop);
        maskCanvasCtx.stroke();

        document.onmousemove = (e2) => {
            // if (e.clientX === e2.clientX && e2.clientY === e2.clientY) return;
            // maskCanvasCtx.beginPath();
            maskCanvasCtx.lineTo(e2.clientX - maskCanvas.offsetLeft, e2.clientY - maskCanvas.offsetTop);
            maskCanvasCtx.stroke();
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            maskCanvasCtx.closePath();
            renderNewImage();
        }
    }
};

const init = async () => {
    const imgObj = await loadImage();
    const {width, height} = initCanvas(imgObj);
    ctxEvent();
}


init();
