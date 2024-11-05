import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel, Image, Card, Statistic, Row, Col, Typography, message } from 'antd';
import { useParams } from "react-router-dom"
import ReactECharts from 'echarts-for-react';
import styles from './index.module.css'
import axiosInstance from "../../../router/axiosInstance";

const { Title, Paragraph, Text, Link } = Typography


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
    "xueke_rank"?: object
    "attr"?: object
    "company"?: object
    "content"?: string
    "num_lab"?: string
    "num_subject"?: string
    "num_master"?: string
    "num_doctor"?: string
}


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

const DemoChart = ({ title, num, numList }: { title: string, num: any[], numList: any[] }) => {
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
                const {
                    name,
                    data,
                } = params[0];
                return `
                  <span style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${name}</span>
                  <sapn style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">：${data} 个</span>
               `
            },
            extraCssText: 'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;'
        },
        xAxis: {
            // 类目轴
            type: "category",
            data: numList,
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
                        var colorList = randomColor();
                        return colorList[params.dataIndex];
                    }
                },
                data: num.map(item => parseInt(item)),

            }
        ]
    };
    return (
        <div className={styles.singleBox}>
            <div className={styles.chartTitle}>{title}</div>
            < ReactECharts className={styles.Demochart} option={option} />
        </div>
    );
}




export default function SchoolIntro({ schoolDetail }: { schoolDetail: SchoolDetailProps }) {
    const { schoolId } = useParams()
    const [schoolImgName, setSchoolImgName] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const loadSchoolImgName = async () => {
        const res = await axiosInstance.get(`/getSchoolImg/${schoolId}`)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '加载院校图片成功',
            });

            console.log(res.data)
            setSchoolImgName(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '加载院校图片失败',
            });
        }

    }

    useEffect(() => {
        loadSchoolImgName()
    }, [])


    if (Object.keys(schoolDetail).length === 0) {
        return <div>Loading...</div>
    }
    const {
        id,
        studyScore,
        lifeScore,
        jobScore,
        comprehensiveScore,
        xueke_rank,
        content,
        num_lab,
        num_subject,
        num_master,
        num_doctor
    } = schoolDetail

    const scoreList = ['学习指数', '生活指数', '就业指数', '综合指数']
    const numList = ['重点实验室', '国家重点学科', '硕士点', '博士点']

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.topBox}>
                    <Carousel
                        className={styles.carousel}
                        autoplay
                        effect="fade">
                        {schoolImgName.map((item, index) => (
                            <Image
                                style={{objectFit: 'cover'}}
                                key={index}
                                width={400}
                                height={300}
                                src={`http://localhost:8000/images_back/${schoolId}.jpg`}
                            />
                        ))}
                    </Carousel>
                </div>
                <div className={styles.topBox}>
                    <div className={styles.introBox}>
                        <div className={styles.schoolScore}>
                            {[lifeScore, jobScore, studyScore, comprehensiveScore].map((item, index) => (
                                <div key={index} className={styles.card1}
                                     style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Card hoverable bordered={false}>
                                        <Statistic
                                            title={scoreList[index]}
                                            value={item}
                                            precision={1}
                                            valueStyle={{color: '#3f8600'}}
                                        />
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <Card
                            hoverable
                            className={styles.schoolCard}
                            classNames={{body: styles.antdCardBody}}
                        >
                            <Paragraph
                                ellipsis={{
                                    rows: 4,
                                    expandable: true,
                                }}
                                title={`${schoolDetail.content}...`}
                            >
                                {schoolDetail.content}
                            </Paragraph>

                            {/* <p className={styles.schoolContent}>{schoolDetail.content} ...</p> */}
                        </Card>
                    </div>
                </div>
                <div className={styles.chartBox}>
                    <DemoChart title='国家实验点' num={[num_lab, num_subject, num_master, num_doctor]}
                               numList={numList}/>
                </div>
                <div className={styles.chartBox}>
                    <DemoChart title='国家学科' num={Object.values(xueke_rank!)} numList={Object.keys(xueke_rank!)}/>
                </div>
            </div>
        </>

    )
}
