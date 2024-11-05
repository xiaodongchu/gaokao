import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { Card, Input, Button, Form, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from "../../router/axiosInstance";

const { Search } = Input



const columns = [
    {
        title: '专业名称',
        dataIndex: 'zymc',
        key: 'zymc',
        render: (text: string, record: any) => <Link to={`/special/${record.key}`}>{text}</Link>,

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
        title: '专业代码',
        key: 'zydm',
        dataIndex: 'zydm',
    },
    {
        title: '修学年限',
        key: 'limit_year',
        dataIndex: 'limit_year',
    },
    {
        title: '授予学位',
        key: 'degree',
        dataIndex: 'degree',
    }
];

export default function SpecialInfo() {
    const [specialList, setSpecialList] = useState([])
    const [curPage, setCurPage] = useState(1)
    const [numTotal, setNumTotal] = useState(0)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        setCurPage(1)
        loadSpecialList(values)
    };

    const onReset = async (values: any) => {
        console.log('reset:', values);
        setCurPage(1)
        loadSpecialList({})
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const loadSpecialList = async (values: any) => {
        console.log('1page', curPage)
        const res = await axiosInstance.post('/getSpecialList', {
            ml: values.ml || '',
            zyl: values.zyl || '',
            zymc: values.zymc || '',
            zydm: values.zydm || '',
            page: curPage
        })
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '获取专业列表成功',
            });
            console.log(res.data)
            setNumTotal(res.data.data.total)
            setSpecialList(res.data.data.specialList)
        } else {
            messageApi.open({
                type: 'error',
                content: '获取专业列表失败',
            });
        }

    }

    useEffect(() => {
        console.log('2page', curPage)
        const values = form.getFieldsValue()
        loadSpecialList(values)
    }, [curPage])


    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <Card
                    className={styles.specialCard}
                    classNames={{ body: styles.antdCardBody }}
                >
                    <Form
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                        onReset={onReset}
                        onFinishFailed={onFinishFailed}
                        layout='inline'
                        className={styles.searchForm}
                    >
                        <Form.Item name="ml">
                            <Input allowClear placeholder="搜索门类" />
                        </Form.Item>
                        <Form.Item name="zyl">
                            <Input allowClear placeholder="搜索专业类" />
                        </Form.Item>
                        <Form.Item name="zymc">
                            <Input allowClear placeholder="搜索专业名称" />
                        </Form.Item>
                        <Form.Item name="zydm">
                            <Input allowClear placeholder="搜索专业代码" />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="reset">
                                重置
                            </Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                搜索
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Table
                    tableLayout='fixed'
                    className={styles.specialTable}
                    columns={columns}
                    dataSource={specialList.map((item: any, index: number) => (
                        {
                            key: item.id,
                            ml: item.type,
                            zyl: item.type_detail,
                            zymc: item.name,
                            zydm: item.id,
                            limit_year: item.limit_year,
                            degree: item.degree
                        }
                    ))}
                    pagination={{
                        total: numTotal,
                        defaultCurrent: 1,
                        current: curPage,
                        onChange: (page: number) => {
                            console.log(page)
                            setCurPage(page)
                        }
                    }}
                // onRow={(record, index) => {
                //     return {
                //         onClick: () => navigate(`/special/${record.key}`)
                //     }
                // }}
                />

            </div>
        </>


    )
}
