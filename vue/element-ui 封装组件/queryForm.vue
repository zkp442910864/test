<style scoped>

</style>

<template>
    <el-form :inline="true" @submit.native.prevent :model="formList.commitData" class="demo-form-inline">

        <template v-for="(item, index) in formList.list">

            <el-form-item :key="index" v-if="item.type === 'inputText'" :label="item.label">
                <el-input v-model="formList.commitData[item.vmodel]" :placeholder="item.placeholder"></el-input>
            </el-form-item>

            <el-form-item :key="index" v-else-if="item.type === 'select'" :label="item.label">
                <el-select v-model="formList.commitData[item.vmodel]">
                    <el-option
                        v-for="(sel, sindex) in item.options"
                        :key="sindex"
                        :label="sel[item.textKey]"
                        :value="sel[item.valKey]"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :key="index" v-else-if="item.type === 'inputDate'" :label="item.label">
                <!-- {{setInputDateDefult(formList.commitData, item.vmodel1, item.vmodel2, item.defaultValue)}} -->
                <el-date-picker
                    v-model="inputDate"
                    @change="inputDateChange(formList.commitData, item.vmodel1, item.vmodel2)"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item :key="index" v-else-if="item.type === 'inputDateTime'" :label="item.label">
                <!-- {{setInputDateTimeDefult(formList.commitData, item.vmodel1, item.vmodel2, item.defaultValue)}} -->
                <el-date-picker
                    v-model="inputDateTime"
                    @change="inputDateTimeChange(formList.commitData, item.vmodel1, item.vmodel2)"
                    :default-time="['00:00:00', '23:59:59']"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

        </template>

        <el-form-item v-if="formList.list.length">
            <el-button type="info" native-type="submit" @click="getPage">查询</el-button>
        </el-form-item>
        <slot name="btn"></slot>
    </el-form>
</template>

<script>
    /* 
		<query-form :form-list="formList" :query-click="() => page.getList(1)">
			<template slot="btn">
				<el-form-item><el-button  type="info" >xxx</el-button></el-form-item>
				<el-form-item><el-button  type="info" >xxx</el-button></el-form-item>
				<el-form-item><el-button  type="info" >xxx</el-button></el-form-item>
			</template>
		</query-form>
        this.formList = {
            commitData: this.page.params,
            list: [
                {
                    type: 'inputText',
                    label: '大厦名称',
                    vmodel: 'buildingName',
                },
                {
                    type: 'select',
                    label: '运营方式',
                    vmodel: 'type',
                    options: this.sort.typeList,
                    textKey: 'text',
                    valKey: 'value'
                },
                {
                    type: 'inputDate',
                    label: '时间范围',
                    vmodel1: 'start',
                    vmodel2: 'end',
                    defaultValue: [new Date(), new Date()]
                },
                {
                    type: 'inputDateTime',
                    label: '时间范围2',
                    vmodel1: 'start2',
                    vmodel2: 'end2',
                    defaultValue: [new Date(), new Date()]
                },
            ]
        }
     */
    export default {
        props: {
            formList: {
                type: Object,
                default: () => {
                    return {
                        commitData: {},
                        list: []
                    }
                }
            },
            queryClick: {
                type: Function
            }
        },
        data () {
            return {
                inputDate: null,
                inputDateTime: null
            }
        },
        methods: {
            // 年月日
            inputDateChange (params, key1, key2) {
                if (this.inputDate) {
                    params[key1] = Tools.TimestampToDate('YYYY-MM-DD', (new Date(this.inputDate[0]) / 1000));
                    params[key2] = Tools.TimestampToDate('YYYY-MM-DD', (new Date(this.inputDate[1]) / 1000));
                } else {
                    params[key1] = undefined;
                    params[key2] = undefined;
                }
            },
            setInputDateDefult (params, key1, key2, dVal) {
                if (!dVal) return;
                if (!(dVal instanceof Array)) {
                    console.error('queryForm -> inputDate -> defaultValue，必传数组[Wed Jun 12 2019 15:36:54 GMT+0800 (中国标准时间), Wed Jun 12 2019 15:36:54 GMT+0800 (中国标准时间)]')
                    return;
                }
                this.inputDate = dVal;
                this.inputDateChange(params, key1, key2);
            },


            // 年月日-时分秒
            inputDateTimeChange (params, key1, key2) {
                if (this.inputDateTime) {
                    params[key1] = Tools.TimestampToDate('YYYY-MM-DD HH:mm:ss', (new Date(this.inputDateTime[0]) / 1000));
                    params[key2] = Tools.TimestampToDate('YYYY-MM-DD HH:mm:ss', (new Date(this.inputDateTime[1]) / 1000));
                } else {
                    params[key1] = undefined;
                    params[key2] = undefined;
                }
            },
            setInputDateTimeDefult (params, key1, key2, dVal) {
                if (!dVal) return;
                if (!(dVal instanceof Array)) {
                    console.error('queryForm -> inputDateTime -> defaultValue，必传数组[Wed Jun 12 2019 15:36:54 GMT+0800 (中国标准时间), Wed Jun 12 2019 15:36:54 GMT+0800 (中国标准时间)]')
                    return;
                }
                this.inputDateTime = dVal;
                this.inputDateTimeChange(params, key1, key2);
            },


			getPage () {
				this.queryClick();
			}
		},
        created () {
            const data = this.formList.commitData;
            this.formList.list.forEach((item) => {
                // console.log(item.type);
                switch (item.type) {
                    case 'inputDate':
                        this.setInputDateDefult(data, item.vmodel1, item.vmodel2, item.defaultValue);
                        break;
                    case 'inputDateTime':
                        this.setInputDateTimeDefult(data, item.vmodel1, item.vmodel2, item.defaultValue);
                        break;
                }
            });
        }
    }
</script>

