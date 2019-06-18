
<template>
    <div>
        <el-upload
            :action="action"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="success"
            :name="'file'"
            :data="{usedWay: 'GOODS_INFO'}"
            :before-upload="beforeUpload"
            :on-exceed="exceed"
            :fileList="fileList.length ? fileList : (value.length ? (fileList = value.map((url) => ({ url }))) : fileList)"
            multiple
            ref="elUpload"
        >
            <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    /**
        1.<up-load-group-img v-model="oimg"></up-load-group-img>
        2.<up-load-group-img :default-img="oimg" @groupImgCb="groupImgCb"></up-load-group-img>
    * 
    */
    import { toast, imgCheck } from "@module/module.js";
    import { upLoadApi2 } from "@module/apiList.js";
    // console.log(upLoadApi);
    export default {
        props: {
            value: {
                type: Array,
                default () {
                    return []
                }
            },
            defaultImg: {
                type: Array,
                default () {
                    return []
                }
            },
            defaultNum: {
                type: Number,
                default: 99
            }
        },
        data () {
            return {
                fileList: [],
                action: upLoadApi2,
                dialogImageUrl: '',
                dialogVisible: false,
                elUpload: null
            }
        },
        methods: {
            exceed (files, fileList) {
                // 上传图片超出限制
                toast(`最多上传${this.defaultNum}张`, 2);
            },
            beforeUpload (file) {
                // 图片校验

                // if (!imgCheck(file)) return false;

                if (this.fileList.length > this.defaultNum) {
                    toast(`最多上传${this.defaultNum}张`, 2);
                    return false;
                }
            },
            handleRemove(file, fileList) {
                // 删除图片
                this.fileList = fileList;
                this.returnData();
            },
            handlePictureCardPreview(file) {
                // 大图查看
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            success (res, item, fileList) {
                // 上传成功回调
                this.fileList = fileList;
                this.returnData();
            },
            returnData () {
                // 把渲染出来的图片扔出去
                let arr = [];
                this.fileList.forEach(item => {
                    // console.log(item)
                    if (item.response) {
                        arr.push(item.response.body.url);
                    } else if (item.url) {
                        arr.push(item.url);
                    }
                });
                this.$emit('groupImgCb', arr);
                this.$emit('input', arr);
            },
            init () {
                if (this.defaultImg.length) {
                    this.defaultImg.forEach((url) => {
                        this.fileList.push({ url });
                    });
                } else if (this.value) {
                    this.value.forEach((url) => {
                        this.fileList.push({ url });
                    });
                }
                this.returnData();
            }
        },
        created () {
            this.init();
            this.unwatch = this.$watch('defaultImg', () => {
                this.init();
            });
        },
        mounted () {
            this.elUpload = this.$refs['elUpload'];
        },
        beforeDestroy () {
            this.unwatch();
        }
    }
</script>
