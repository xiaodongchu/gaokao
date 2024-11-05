import React, { useState, useEffect } from 'react'
import { Card, Image, Divider, Tabs, Tag, Space, message } from 'antd'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import SpecialExtend from './specialExtend';
import SpecialIntro from './specialintro';
import SpecialJob from './specialJob';
import styles from './index.module.css'
import axiosInstance from "../../router/axiosInstance";




export default function SpecialDetail() {

    const { specialId } = useParams()
    const [specialDetail, setSpecialDetail] = useState<any>({})
    const [messageApi, contextHolder] = message.useMessage();

    console.log(specialId)
    const onChange = (key: string) => {
        console.log(key);
    };


    const items = [
        {
            key: '1',
            label: '专业概况',
            children: <SpecialIntro specialDetail={specialDetail} />,
        },
        {
            key: '2',
            label: '专业拓展',
            children: <SpecialExtend specialDetail={specialDetail} />,
        },
        {
            key: '3',
            label: '相关就业',
            children: <SpecialJob specialDetail={specialDetail} />,
        }
    ];


    const loadSpecialDetail = async () => {
        const res = await axiosInstance.get(`/getSpecialDetail/${specialId}`)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '获取专业详情成功',
            });

            console.log(res.data)
            setSpecialDetail(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '获取专业详情失败',
            });
        }

    }

    useEffect(() => {
        loadSpecialDetail()
    }, [])

    if (Object.keys(specialDetail).length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.head}>
                    <div>
                        <Card
                            hoverable
                            className={styles.specialCard}
                            classNames={{ body: styles.antdCardBody }}
                        >
                            <div className={styles.topBox}>
                                <span className={styles.title}>{specialDetail.name}</span>
                                <Tag color="#f50">人气值：{specialDetail.hot}</Tag>
                            </div>
                            <div className={styles.info}>
                                <Tag color="cyan">学历层次</Tag>
                                {specialDetail.level}
                                <Divider type="vertical" />
                                <Tag color="cyan">专业代码</Tag>
                                {specialDetail.id}
                                <Divider type="vertical" />
                                <Tag color="cyan">门类</Tag>
                                {specialDetail.type}
                                <Divider type="vertical" />
                                <Tag color="cyan">专业类</Tag>
                                {specialDetail.type_detail}
                                <Divider type="vertical" />
                                <Tag color="cyan">修学年限</Tag>
                                {specialDetail.limit_year}
                                <Divider type="vertical" />
                                <Tag color="cyan">授予学位</Tag>
                                {specialDetail.degree}
                            </div>
                        </Card>
                    </div>
                </div>

                <div className={styles.detailBox}>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </div>

            </div>
        </>

    )
}
