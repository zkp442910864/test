<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		border: 1px dashed #d9d9d9;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 150px;
		height: 150px;
		line-height: 150px;
		text-align: center;
	}
	.avatar-uploader .avatar {
		width: 150px;
		height: 150px;
		display: block;
        object-fit: contain;
	}
</style>

<template>
    <div>
        <el-upload
            class="avatar-uploader el-upload-list--picture-card"
            ref="upload"
            :auto-upload="false"
            :action="url"
            :data="params"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            :on-change="onChange"
        >
            <template v-if="imageUrl">
                <img :src="imageUrl" class="avatar">
                <span class="el-upload-list__item-actions" @click.stop="maskClick($event, imageUrl)">
                    <span class="">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="">
                        <i class="el-icon-upload"></i>
                    </span>
                </span>
            </template>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-dialog width="640px" :visible.sync="dialogVisible" :modal="false">
			<img width="100%" :src="imageUrl" alt="">
		</el-dialog>
    </div>
</template>

<script>
    import {upLoadApi2} from '@module/apiList.js';
    import {toast} from '@module/module.js';

    const compress = {
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

    export default {
        name: 'upLoadImg2',
        props: {
            value: {
                type: String,
                default: ''
            },
            action: {
                type: String,
                default: upLoadApi2
            }
        },
        data () {
            return {
                url: null,
                dialogVisible: false,
                imageUrl: '',
                params: {
                    usedWay: 'ADVER',
                    token: Tools.getLocalStorage('token')
                },
                uploadDom: null
            }
        },
        methods: {
            maskClick (e, url) {
                if (e.target.classList.contains('el-icon-zoom-in')) {
                    this.dialogVisible = true;
                } else if (e.target.classList.contains('el-icon-upload')) {
                    const evnet = document.createEvent('MouseEvents');
                    evnet.initMouseEvent('click', true, true);
                    e.currentTarget.parentNode.dispatchEvent(evnet);
                }
            },
            handleAvatarSuccess (res, file) {
                try {
                    const data = res.body || res.data;
                    this.imageUrl = data.url;
                    this.$emit('input', data.url);
                } catch (error) {
                    if (res.msg) {
                        toast(res.msg, 3);
                    }
                    console.error(res);
                }
            },
            beforeUpload (file) {
                // console.log(file);
                // return false;
            },
            onChange (file, fileList) {
                // console.log(file);
                // console.log(fileList);
                if (file.status === 'ready') {
                    compress.run(file.raw).then((compressFile) => {
                        compressFile.uid = file.raw.uid;
                        file.raw = compressFile;
                        // console.log(file);
                        // console.log(compressFile);
                        this.uploadDom.submit();
                    });
                } else if (file.status === 'fail') {
                    // console.log(file);
                    // console.log(fileList);
                }
            },
        },
        created () {
            this.imageUrl = this.value;
            this.url = this.action;
        },
        mounted () {
            this.$nextTick(() => {
                this.uploadDom = this.$refs.upload;
            });
        }
    }
</script>
