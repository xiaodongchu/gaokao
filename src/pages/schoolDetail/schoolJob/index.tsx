import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import ReactECharts from 'echarts-for-react';
import { Table } from 'antd'
import axios from 'axios'

interface SchoolDetailProps {
    "id"?: string,
    "name"?: string
    "province"?: string
    "city"?: string
    "nature"?: string
    "level"?: string
    "f985"?: string
    "f211"?: string
    "dual_class"?: string
    "studyScore"?: string
    "lifeScore"?: string
    "jobScore"?: string
    "comprehensiveScore"?: string
    "jobRate"?: string
    "postgraduateRate"?: string
    "abroadRate"?: string
    "men_rate"?: string
    "attr"?: object
    "company"?: object
    "content"?: string
    "num_lab"?: string
    "num_subject"?: string
    "num_master"?: string
    "num_doctor"?: string
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
                        var colorList = [
                            'rgb(255,21,21)',
                            'rgb(0,122,255)',
                            'rgb(255,102,2)',
                            'rgb(0,182,142)',
                            'rgb(0,122,142)',
                            'rgb(0,182,42)',
                            '#99FFFF',
                            '#FFB3FF',
                            '#BA55D3 '
                        ];
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


export default function SchoolJob({ schoolDetail }: { schoolDetail: SchoolDetailProps }) {

    const { attr, company } = schoolDetail

    const columns = [
        {
            title: '序号',
            dataIndex: 'order',
            key: 'order',
        },
        {
            title: '单位名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '人数',
            dataIndex: 'num',
            key: 'num',
        }
    ];

    return (
        <div className={styles.jobContainer}>
            {
                Object.keys(attr!).length > 0 &&
                <>
                    <div className={styles.jobTitle}>
                        毕业生签约单位性质
                    </div>
                    <DemoChart label={Object.keys(attr!)} value={Object.values(attr!)} />
                </>
            }
            {
                Object.keys(company!).length > 0 &&
                <>
                    <div className={styles.jobTitle}>
                        主要签约单位
                    </div>
                    <Table
                        className={styles.table}
                        columns={columns}
                        dataSource={Object.entries(company!).map((item: any, index: number) => (
                            {
                                key: index,
                                order: index + 1,
                                name: item[0],
                                num: item[1],
                            }
                        ))}
                    />
                </>
            }


        </div>
    )
}
