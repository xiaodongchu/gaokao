import React, { useState, useEffect } from 'react'
import { Modal, message, Table } from 'antd'
import styles from './index.module.css'
import axios from 'axios'
import axiosInstance from "../../router/axiosInstance";
export default function VolunModal({ volunModalOpen, setVolunModalOpen }: { volunModalOpen: boolean, setVolunModalOpen: any }) {

    const [schoolList, setSchoolList] = useState([])
    const username = localStorage.getItem('username')
    const [messageApi, contextHolder] = message.useMessage();

    const loadSchoolList = async () => {
        const res = await axiosInstance.get(`/getVolunteer/`)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '志愿表加载成功',
            });
            setSchoolList(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '志愿表加载失败',
            });
        }
    }
    useEffect(() => {
        if (!volunModalOpen) return
        loadSchoolList()
    }, [volunModalOpen])

    const onDelete = async (school_id: any) => {
        const res = await axiosInstance.post(`/delVolunteer`, {
            school_id: school_id,
            username: username
        })
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
            setVolunModalOpen(false)
        } else {
            messageApi.open({
                type: 'error',
                content: '志愿删除失败',
            });
        }

    }


    const columns = [
        {
            title: '院校名称',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: '风险程度',
            dataIndex: 'risk',
            key: 'risk',
        },
        {
            title: '删除',
            dataIndex: 'delete',
            key: 'delete',
            render: (text: any, record: any, index: number) => {
                return (
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onDelete(record.key)}>删除</span>
                )
            }
        }

    ];


    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{ fontSize: '20px', marginBottom: '25px' }}>我的志愿表</div>}
                open={volunModalOpen}
                onCancel={() => setVolunModalOpen(false)}
                onOk={() => setVolunModalOpen(false)}
                centered
            >
                <Table
                    tableLayout='fixed'
                    columns={columns}
                    dataSource={schoolList.map((item: any, index: number) => (
                        {
                            key: item.school_id,
                            name: item.school_name,
                            risk: item.risk
                        }
                    ))}
                    pagination={{ pageSize: 5 }}
                />

            </Modal>
        </>

    )
}
