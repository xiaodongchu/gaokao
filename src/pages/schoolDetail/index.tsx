import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Image, Divider, Tabs, message } from 'antd'
import SchoolIntro from './schoolintro'
import SchoolScore from './schoolScore'
import SchoolSpecial from './schoolSpecial'
import SchoolJob from './schoolJob'
import axios from 'axios'
import styles from './index.module.css'
import axiosInstance from "../../router/axiosInstance";


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




export default function SchoolDetail() {

    const { schoolId } = useParams()
    const [schoolDetail, setSchoolDetail] = useState<SchoolDetailProps>({})
    const [messageApi, contextHolder] = message.useMessage();

    const items = [
        {
            key: '1',
            label: '学校概况',
            children: <SchoolIntro schoolDetail={schoolDetail} />,
        },
        {
            key: '2',
            label: '开设专业',
            children: <SchoolSpecial />,
        },
        {
            key: '3',
            label: '专业计划',
            children: <SchoolScore />,
        },
        {
            key: '4',
            label: '就业情况',
            children: <SchoolJob schoolDetail={schoolDetail} />,
        },
    ];


    const loadSchoolDetail = async () => {
        const res = await axiosInstance.get(`/getSchoolDetail/${schoolId}`)
        console.log('schoolDetail', res.data)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '加载院校详情成功',
            });
            setSchoolDetail(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '加载院校详情失败',
            });
        }

    }

    const onChange = (key: string) => {
        console.log(key);
    };

    useEffect(() => {
        loadSchoolDetail()
    }, [])

    const navigate = useNavigate()

    if (Object.keys(schoolDetail).length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.head}>
                    <div className={styles.schoolList}>
                        <Card
                            hoverable
                            className={styles.schoolCard}
                            classNames={{ body: styles.antdCardBody }}
                        >
                            <Image
                                width={120}
                                src={`http://localhost:8000/images/${schoolId}.jpg`}
                            />
                            <div className={styles.schoolBasic}>
                                <div className={styles.name}>{schoolDetail.name}</div>
                                <div className={styles.address}>{schoolDetail.city}, {schoolDetail.province}</div>
                                <div className={styles.info}>
                                    <div className={styles.info}>
                                        {schoolDetail.f985 === '1' ?
                                            <>
                                                985
                                                <Divider type="vertical" />
                                            </>
                                            : null}
                                        {schoolDetail.f211 === '1' ?
                                            <>
                                                211
                                                <Divider type="vertical" />
                                            </>
                                            : null}
                                        {schoolDetail.dual_class === '1' ?
                                            <>
                                                双一流
                                                <Divider type="vertical" />
                                            </>
                                            : null}
                                        {schoolDetail.nature}
                                        <Divider type="vertical" />
                                        {schoolDetail.level}
                                    </div>
                                </div>
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
