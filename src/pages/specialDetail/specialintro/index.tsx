import React from 'react'
import styles from './index.module.css'
import { Card, Statistic, Space, Progress, Tooltip, Typography } from 'antd'

const { Title, Paragraph, Text, Link } = Typography

export default function SpecialIntro({ specialDetail }: { specialDetail: any }) {

    const satisfactionList = [
        { name: '办学条件满意度', value: specialDetail.educationConditions_satisfaction },
        { name: '教学质量满意度', value: specialDetail.teachingQuality_satisfaction },
        { name: '就业满意度', value: specialDetail.jobRate_satisfaction },
        { name: '综合满意度', value: specialDetail.overall_satisfaction }
    ]

    const manRate = specialDetail.manRate.split(':')
    const content: string[] = specialDetail.content.split('。')
    content.pop()

    return (
        <div className={styles.container}>
            <Space direction='vertical'>
                <div className={styles.introBox}>
                    <Space className={styles.scoreBox}>
                        {
                            satisfactionList.map((item, index) => (
                                <Card key={index} hoverable className={styles.card} bordered={false}>
                                    <Statistic
                                        title={item.name}
                                        value={item.value}
                                        precision={1}
                                        valueStyle={{ color: '#3f8600', textAlign: 'center' }}
                                    />
                                </Card>
                            ))
                        }
                    </Space>
                    <div className={styles.progressBox}>
                        <div style={{ marginRight: 'calc(2em + 8px)' }}>男</div>
                        <Tooltip title={`男女比例   ${manRate[0]} : ${manRate[1]}`}>
                            <Progress format={(percent) => ``} size={['100%', 20]} percent={100} success={{ percent: parseFloat(manRate[0]) }} />
                        </Tooltip>
                        <div>女</div>
                    </div>
                </div>
                <Card hoverable className={styles.textBox}>
                    <Typography>
                        <Title level={3}>专业简介</Title>
                        <Title level={4}>是什么</Title>
                        <Paragraph>{specialDetail.is_what}</Paragraph>
                        <Title level={4}>学什么</Title>
                        <Paragraph>{specialDetail.learn_what}</Paragraph>
                        <Title level={4}>做什么</Title>
                        <Paragraph>{specialDetail.do_what}</Paragraph>
                    </Typography>
                </Card>
                <Card hoverable className={styles.textBox}>
                    <Typography>
                        <Title level={3}>专业详解</Title>
                        {
                            content.map((item: string, index: number) => {
                                const [t, c] = item.split('：')
                                return (
                                    <Paragraph key={index}>
                                        <Text style={{ fontSize: '16px' }} strong>{t}：</Text>
                                        {c}。
                                    </Paragraph>
                                )

                            })
                        }
                    </Typography>
                </Card>
            </Space>



        </div >
    )
}
