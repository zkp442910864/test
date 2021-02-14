<style scoped>

</style>

<template>
    <div
        style="width: 100%;"
        :style="{height: height || '400px', width: width || '100%'}"
        ref="echart"
        class="rel"
    >
        <div class="el-loading-mask" style=""><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div>
    </div>
</template>

<script>
    // import echarts from 'echarts';
    let echarts = null;
    const setStyle = () => {
        echarts.registerTheme('style2', {
            "color": [
                "#2ec7c9",
                "#b6a2de",
                "#5ab1ef",
                "#ffb980",
                "#d87a80",
                "#8d98b3",
                "#e5cf0d",
                "#97b552",
                "#95706d",
                "#dc69aa",
                "#07a2a4",
                "#9a7fd1",
                "#588dd5",
                "#f5994e",
                "#c05050",
                "#59678c",
                "#c9ab00",
                "#7eb00a",
                "#6f5553",
                "#c14089"
            ],
            "backgroundColor": "rgba(0,0,0,0)",
            "textStyle": {},
            "title": {
            "textStyle": {
                "color": "#008acd"
            },
            "subtextStyle": {
                "color": "#aaaaaa"
            }
            },
            "line": {
            "itemStyle": {
                "normal": {
                "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                "width": 2
                }
            },
            "symbolSize": 3,
            "symbol": "emptyCircle",
            "smooth": true
            },
            "radar": {
            "itemStyle": {
                "normal": {
                "borderWidth": 1
                }
            },
            "lineStyle": {
                "normal": {
                "width": 2
                }
            },
            "symbolSize": 3,
            "symbol": "emptyCircle",
            "smooth": true
            },
            "bar": {
            "itemStyle": {
                "normal": {
                "barBorderWidth": 0,
                "barBorderColor": "#ccc"
                },
                "emphasis": {
                "barBorderWidth": 0,
                "barBorderColor": "#ccc"
                }
            }
            },
            "pie": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "scatter": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "boxplot": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "parallel": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "sankey": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "funnel": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "gauge": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                },
                "emphasis": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            }
            },
            "candlestick": {
            "itemStyle": {
                "normal": {
                "color": "#d87a80",
                "color0": "#2ec7c9",
                "borderColor": "#d87a80",
                "borderColor0": "#2ec7c9",
                "borderWidth": 1
                }
            }
            },
            "graph": {
            "itemStyle": {
                "normal": {
                "borderWidth": 0,
                "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                "width": 1,
                "color": "#aaaaaa"
                }
            },
            "symbolSize": 3,
            "symbol": "emptyCircle",
            "smooth": true,
            "color": [
                "#2ec7c9",
                "#b6a2de",
                "#5ab1ef",
                "#ffb980",
                "#d87a80",
                "#8d98b3",
                "#e5cf0d",
                "#97b552",
                "#95706d",
                "#dc69aa",
                "#07a2a4",
                "#9a7fd1",
                "#588dd5",
                "#f5994e",
                "#c05050",
                "#59678c",
                "#c9ab00",
                "#7eb00a",
                "#6f5553",
                "#c14089"
            ],
            "label": {
                "normal": {
                "textStyle": {
                    "color": "#eeeeee"
                }
                }
            }
            },
            "map": {
            "itemStyle": {
                "normal": {
                "areaColor": "#dddddd",
                "borderColor": "#eeeeee",
                "borderWidth": 0.5
                },
                "emphasis": {
                "areaColor": "rgba(254,153,78,1)",
                "borderColor": "#444444",
                "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                "textStyle": {
                    "color": "#d87a80"
                }
                },
                "emphasis": {
                "textStyle": {
                    "color": "rgb(100,0,0)"
                }
                }
            }
            },
            "geo": {
            "itemStyle": {
                "normal": {
                "areaColor": "#dddddd",
                "borderColor": "#eeeeee",
                "borderWidth": 0.5
                },
                "emphasis": {
                "areaColor": "rgba(254,153,78,1)",
                "borderColor": "#444444",
                "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                "textStyle": {
                    "color": "#d87a80"
                }
                },
                "emphasis": {
                "textStyle": {
                    "color": "rgb(100,0,0)"
                }
                }
            }
            },
            "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                "color": "#008acd"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                "color": "#333"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                "color": [
                    "#eee"
                ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
                }
            }
            },
            "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                "color": "#008acd"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                "color": [
                    "#eee"
                ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
                }
            }
            },
            "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                "color": "#008acd"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                "color": [
                    "#eee"
                ]
                }
            },
            "splitArea": {
                "show": true,
                "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
                }
            }
            },
            "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                "color": "#008acd"
                }
            },
            "axisTick": {
                "show": true,
                "lineStyle": {
                "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                "color": "#333"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                "color": [
                    "#eee"
                ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                "color": [
                    "rgba(250,250,250,0.3)",
                    "rgba(200,200,200,0.3)"
                ]
                }
            }
            },
            "toolbox": {
            "iconStyle": {
                "normal": {
                "borderColor": "#2ec7c9"
                },
                "emphasis": {
                "borderColor": "#18a4a6"
                }
            }
            },
            "legend": {
            "textStyle": {
                "color": "#333333"
            }
            },
            "tooltip": {
            "axisPointer": {
                "lineStyle": {
                "color": "#008acd",
                "width": "1"
                },
                "crossStyle": {
                "color": "#008acd",
                "width": "1"
                }
            }
            },
            "timeline": {
            "lineStyle": {
                "color": "#008acd",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                "color": "#008acd",
                "borderWidth": 1
                },
                "emphasis": {
                "color": "#a9334c"
                }
            },
            "controlStyle": {
                "normal": {
                "color": "#008acd",
                "borderColor": "#008acd",
                "borderWidth": 0.5
                },
                "emphasis": {
                "color": "#008acd",
                "borderColor": "#008acd",
                "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#2ec7c9",
                "borderColor": "rgba(46,199,201,0.4)"
            },
            "label": {
                "normal": {
                "textStyle": {
                    "color": "#008acd"
                }
                },
                "emphasis": {
                "textStyle": {
                    "color": "#008acd"
                }
                }
            }
            },
            "visualMap": {
            "color": [
                "#5ab1ef",
                "#e0ffff"
            ]
            },
            "dataZoom": {
            "backgroundColor": "rgba(47,69,84,0)",
            "dataBackgroundColor": "rgba(239,239,255,1)",
            "fillerColor": "rgba(182,162,222,0.2)",
            "handleColor": "#008acd",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
            },
            "markPoint": {
            "label": {
                "normal": {
                "textStyle": {
                    "color": "#eeeeee"
                }
                },
                "emphasis": {
                "textStyle": {
                    "color": "#eeeeee"
                }
                }
            }
            }
        });
    }

    export default {
        props: {
            height: {
                type: String,
                default: '400px'
            },
            width: {
                type: String,
                default: '100%'
            },
            data: {
                type: Object,
                default () {
                    return {
                        xAxis: {},
                        yAxis: {},
                    };
                }
            },
        },
        data () {
            const self = this;
            return {
                chart: null,
                unWatch: null,
                loading: true
            }
        },
        methods: {
            setData () {
                this.chart.setOption(this.data);
                this.closeLoad();
            },
            init () {
                // const self = this;
                this.chart = echarts.init(this.$refs.echart, 'style2');
                this.setData();
                this.$emit('get-echart', this.chart);
                window.addEventListener('resize', this.resize, false);
            },
            resize () {
                this.chart.resize();
            },
            openLoad () {
                if (this.chart) {
                    this.chart.showLoading({
                        text: '数据正在努力加载...',
                        textStyle: { fontSize : 30 , color: '#444' },
                        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
                    });
                }
            },
            closeLoad () {
                this.chart && this.chart.hideLoading();
            }
        },
        activated () {
            if (echarts && this.chart) this.resize();
        },
        created () {},
        mounted () {
            
            import(/* webpackChunkName: "echarts" */'echarts').then(aEcharts => {
                this.loading = false;
                echarts = aEcharts;

                // setStyle();

                this.$nextTick(() => {
                    this.init();
                });

                this.unWatch = this.$watch('data', () => {
                    this.$nextTick(() => {
                        this.setData();
                    });
                });
            });
        },
        beforeDestroy () {
            window.removeEventListener('resize', this.resize);
            this.unWatch && this.unWatch();
        }
    }
</script>
