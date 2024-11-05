import React from 'react'
import { Space, Card } from 'antd'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import styles from './index.module.css'

function randomColor() {
    let colorList = []
    for (let i = 0; i < 15; i++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        colorList.push(`rgb(${r}, ${g}, ${b})`)
    }
    return colorList


}

const DemoChartLine = ({ label, value, value2 }: { label: any[], value: any[], value2: any[] }) => {
    let option = {
        backgroundColor: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
                {
                    offset: 0,
                    color: "#c86589",
                },
                {
                    offset: 1,
                    color: "#06a7ff",
                },
            ],
            false
        ),
        // title: {
        //     text: "OCTOBER 2015",
        //     left: "center",
        //     bottom: "5%",
        //     textStyle: {
        //         color: "#fff",
        //         fontSize: 16,
        //     },
        // },
        grid: {
            top: "20%",
            left: "10%",
            right: "10%",
            bottom: "15%",
            containLabel: true,
        },
        legend: {
            icon: "rect",
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ["本专业", "所有专业"],
            right: "4%",
            textStyle: {
                fontSize: 12,
                color: "#F1F1F3",
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: label,
            axisLabel: {
                margin: 30,
                color: "#ffffff63",
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: true,
                length: 25,
                lineStyle: {
                    color: "#ffffff1f",
                },
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#ffffff1f",
                },
            },
        },
        yAxis: [
            {
                type: "value",
                position: "right",
                axisLabel: {
                    margin: 20,
                    color: "#ffffff63",
                },

                axisTick: {
                    show: true,
                    length: 15,
                    lineStyle: {
                        color: "#ffffff1f",
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#ffffff1f",
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff",
                        width: 2,
                    },
                },
            },
        ],
        series: [
            {
                name: "本专业",
                type: "line",
                smooth: true, //是否平滑曲线显示
                showAllSymbol: true,
                symbol: "circle",
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "#fff", // 线条颜色
                    },
                },
                label: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: "#fff",
                    },
                },
                itemStyle: {
                    color: "red",
                    borderColor: "#fff",
                    borderWidth: 3,
                },
                tooltip: {
                    show: false,
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "#eb64fb",
                                },
                                {
                                    offset: 1,
                                    color: "#3fbbff0d",
                                },
                            ],
                            false
                        ),
                    },
                },
                data: value
            },
            {
                name: "所有专业",
                type: "line",
                smooth: true, //是否平滑曲线显示
                showAllSymbol: true,
                symbol: "circle",
                symbolSize: 6,
                lineStyle: {
                    normal: {
                        color: "rgb(0,136,212)", // 线条颜色
                    },
                },
                label: {
                    show: true,
                    position: "top",
                    textStyle: {
                        color: "#fff",
                    },
                },
                itemStyle: {
                    color: "rgb(0,136,212)",
                    borderColor: "rgb(0,136,212)",
                    borderWidth: 3,
                },
                tooltip: {
                    show: false,
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "#eb64fb",
                                },
                                {
                                    offset: 1,
                                    color: "#3fbbff0d",
                                },
                            ],
                            false
                        ),
                    },
                },
                data: value2
            },
        ],
    };

    return (
        <ReactECharts className={styles.Demochart} option={option} />
    );
}


const DemoChart = ({ label, value }: { label: any[], value: any[] }) => {
    // 返回折线图的配置对象
    let option = {
        grid: {
            containLabel: true,
            top: 30,
            right: 15,
            bottom: 0,
            left: 15
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params: any) => {
                console.log(params)
                const {
                    name,
                    data,
                } = params[0];
                return `
                  <span style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${name}</span>
                  <sapn style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">：${data} %</span>
               `
            },
            extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;'
        },
        xAxis: {
            // 类目轴
            type: "category",
            data: label,
            axisTick: {
                show: false //隐藏X轴刻度
            },
            axisLine: {
                lineStyle: {
                    color: "#CCCCCC"
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000',
                    fontSize: 14,
                    fontFamily: 'Source Han Sans CN-Regular',
                }
            },
        },
        yAxis: {
            type: 'value',
            name: "",
            nameTextStyle: {
                color: 'rgba(0,0,0,0.65)',
                fontSize: 14,
                fontFamily: 'Source Han Sans CN-Regular',
                align: "left",
                verticalAlign: "center",
            },
            axisLabel: {
                color: 'rgba(0,0,0,0.65)',
                textStyle: {
                    fontSize: 14
                },
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(223, 223, 223, 1)',
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(223, 223, 223, 1)',
                    type: "dashed",
                }
            }
        },
        series: [
            {
                type: "bar",
                barWidth: "50%",
                showBackground: true,
                backgroundStyle: {
                    color: "transparent"
                },
                itemStyle: {  // 为每个柱设置单独的颜色
                    color: function (params: any) {
                        var colorList = randomColor()
                        return colorList[params.dataIndex];
                    }
                },
                data: value.map(item => parseFloat(item)),

            }
        ]
    };
    return (
        <ReactECharts className={styles.Demochart} option={option} />
    );
}



export default function SpecialJob({ specialDetail }: { specialDetail: any }) {

    const { area, industry, allMajorSalaryAvg, majorSalaryAvg, position } = specialDetail
    const { mostEmployedPostion, mostEmploymentArea, mostEmploymentIndustry } = specialDetail

    console.log(allMajorSalaryAvg)

    return (
        <div className={styles.container}>
            <Space style={{ width: '100%' }} size={'middle'} direction='vertical'>
                <div className={styles.jobTitle}>
                    薪酬
                </div>
                <DemoChartLine label={['应届生', '2 年经验', '5 年经验', '10 年经验']} value={majorSalaryAvg} value2={allMajorSalaryAvg} />

                <div className={styles.jobTitle}>
                    就业行业分布
                </div>
                <DemoChart label={Object.keys(industry!)} value={Object.values(industry!)} />

                <div className={styles.jobTitle}>
                    就业岗位分布
                </div>
                <DemoChart label={Object.keys(position!)} value={Object.values(position!)} />

                <div className={styles.jobTitle}>
                    就业地区分布
                </div>
                <DemoChart label={Object.keys(area!)} value={Object.values(area!)} />
            </Space>

        </div>
    )
}
