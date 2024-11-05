import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Form, Table, message } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import axios from 'axios'
import axiosInstance from "../../../router/axiosInstance";


export default function SchoolSpecial() {
    const [specialList, setSpecialList] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [numTotal, setNumTotal] = useState(0)
    const { schoolId } = useParams()
    console.log(schoolId)

    const [messageApi, contextHolder] = message.useMessage();



    const loadSpecialList = async () => {
        const res = await axiosInstance.get(`/getSchoolOpenSpecial/${schoolId}`)

        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '获取开设专业列表成功！',
            });
            setSpecialList(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '获取开设专业列表失败！',
            });
        }
    }

    useEffect(() => {
        loadSpecialList()
    }, [])



    const columns = [
        {
            title: '专业名称',
            dataIndex: 'zymc',
            key: 'zymc',
            render: (text: string, record: any) => <Link to={`/special/${record.key}`}>{text}</Link>,

        },
        {
            title: '层次',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: '门类',
            dataIndex: 'ml',
            key: 'ml',
        },
        {
            title: '专业类',
            dataIndex: 'zyl',
            key: 'zyl',
        },
        {
            title: '修学年限',
            key: 'limit_year',
            dataIndex: 'limit_year',
        }
    ];

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <Table
                    // tableLayout='fixed'
                    columns={columns}
                    dataSource={specialList.map((item: any, index: number) => (
                        {
                            key: item.id,
                            zymc: item.name,
                            level: item.level,
                            ml: item.type,
                            zyl: item.type_detail,
                            limit_year: item.limit_year
                        }
                    ))}
                />
            </div>
        </>

    )



}
