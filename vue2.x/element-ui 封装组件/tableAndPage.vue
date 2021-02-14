<style scoped>

</style>

<template>
    <div id="z-table">
        <slot :list="list" :maxHeight="maxHeight"></slot>
        
        <el-pagination
            class="p-t-ten"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curParams[curFieldKey.pageNumberKey]"
            :page-sizes="pageSizes"
            :page-size="curParams[curFieldKey.pageSizeKey]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<!--
    request 一个请求接口
    params 参数
    fieldKey 字段Key

    通过 $refs 获取组件函数调用

    <tableAndPage :request="request" :params="params" ref="tableAndPage" :fieldKey="{pageNumberKey: 'pageNo'}">
        <div slot-scope="data">
            <el-table :data="data.list" border style="width: 100%" :max-height="data.maxHeight">
                <el-table-column prop="orderTime" label="大厦名称"></el-table-column>
                <el-table-column prop="buildingName" label="城市"></el-table-column>
                <el-table-column prop="payChoice" label="总出勤人次"></el-table-column>
                <el-table-column prop="riderPhone" label="正常出勤人次"></el-table-column>
                <el-table-column prop="relationOrderId" label="迟到人次"></el-table-column>
                <el-table-column prop="receivableMoney" label="早退"></el-table-column>
                <el-table-column prop="actualMoney" label="缺卡人次"></el-table-column>
                <el-table-column prop="diffMoney" label="操作">
                    <div slot-scope="scope">
                        <el-button type="success" size="mini">明细</el-button>
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </tableAndPage>
-->

<script>
    import { throttle } from '@module/module.js';

    const fieldKey = {
        rChildKey: 'data',
        rChildListKey: 'records',
        rChildTotaltKey: 'total',
        pageSizeKey: 'pageSize',
        pageNumberKey: 'pageNumber',
    };

    export default {
        props: {
            request: {
                type: Function,
                required: true
            },
            params: {
                type: Object,
                required: true
            },
            hgandle: {
                type: Function
            },
            fieldKey: {
                type: Object,
                default () {
                    return fieldKey;
                }
            },
            isLoad: {
                type: Boolean,
                default: false
            }
        },
        data () {
            // const self = this;
            return {
                list: [],
                total: 0,
                pageSizes: [5, 10, 50, 100, 400],
                curParams: {
                    pageNumber: 0,
                    pageSize: 0
                },
                curFieldKey: {},
                maxHeight: 500,
                table: null
            }
        },
        methods: {
            handleSizeChange(e) {
                this.curParams[this.curFieldKey.pageSizeKey] = e;
                this.curParams[this.curFieldKey.pageNumberKey] = 1;
                this.getList();
            },
            handleCurrentChange(e) {
                this.curParams[this.curFieldKey.pageNumberKey] = e;
                this.getList();
            },
            getList (type) {
                const data = Object.assign(this.curParams, this.params);

                if (this.hgandle) {
                    this.hgandle(type, data);
                } else {
                    if (type) data[this.curFieldKey.pageNumberKey] = 1;
                }

                this.request(data).then(res => {
                    this.list = res[this.curFieldKey.rChildKey][this.curFieldKey.rChildListKey];
                    this.total = res[this.curFieldKey.rChildKey][this.curFieldKey.rChildTotaltKey];
                    this.setHeight();
                });
            },
            setHeight () {
                this.$nextTick(() => {
                    if (this.table === null) return;
                    const h = document.documentElement.clientHeight;
                    let mh = h - this.table.offsetTop - 40 - 30;
                    if (mh < 500) {
                        mh = 500;
                    }
                    this.maxHeight = mh;
                });
            }
        },
        created () {
            this.curFieldKey = Object.assign({}, fieldKey, this.fieldKey);
            this.curParams = {
                [this.curFieldKey.pageNumberKey]: 1,
                [this.curFieldKey.pageSizeKey]: this.pageSizes[1]
            };
            this.isLoad && this.getList(1);
        },
        mounted () {
            this.$nextTick(() => {
                this.table = document.getElementById('z-table');
            });
        },
        beforeDestroy () {},
        activated () {
            this.setHeight();
            this.setHeight = throttle(this.setHeight);
            window.addEventListener('resize', this.setHeight, false);
        },
        deactivated () {
            window.removeEventListener('resize', this.setHeight);
        }
    }
</script>

