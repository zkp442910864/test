const compress = {
    // 压缩过程
    process (file) {
        const self = this;
        return new Promise((rel, rej) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
                image.src = e.target.result;

                image.onload = function() {
                    let canvas = document.createElement('canvas'),
                        context = canvas.getContext('2d'),
                        data = '',
                        imageWidth = image.width,
                        imageHeight = image.height;


                    if (!(imageWidth > 750 && file.type.indexOf('png') === -1)) {
                        rel(file);
                        return;
                    }

                    // 宽大于750，且不能是png图

                    //压缩后图片的大小
                    imageHeight = 750 * imageHeight / imageWidth;
                    imageWidth = 750;


                    canvas.width = imageWidth;
                    canvas.height = imageHeight;

                    context.drawImage(image, 0, 0, imageWidth, imageHeight);
                    data = canvas.toDataURL('image/jpeg');
                    //压缩完成
                    rel(new File([self.convertBase64UrlToBlob(data)], file.name, {type: 'image/jpeg', lastModified: Date.now()}));
                }
            }
        });
    },
    convertBase64UrlToBlob (urlData) {
        const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
        // 处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
              ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/png' });
    },
    run (file) {
        return this.process(file);
    }
}