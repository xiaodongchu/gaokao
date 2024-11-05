import React, { useEffect, useState, useContext } from 'react'
import { Modal, message, Form, InputNumber, Select, Checkbox, Button, Space } from 'antd'
import { ProvinceContext, gaokaoContext } from '../../utils/context'
import styles from './index.module.css'
import axios from 'axios'
import axiosInstance from "../../router/axiosInstance";

export default function InfoModal({ modalOpen, setModalOpen }: { modalOpen: boolean, setModalOpen: any }) {


    const { info, setInfo } = useContext(gaokaoContext)
    console.log('modal info', info)

    const [messageApi, contextHolder] = message.useMessage();

    const username = localStorage.getItem('username') || 'zzz'
    const [form] = Form.useForm()

    useEffect(() => {
        const { values } = info
        form.setFieldsValue(values)
    }, [info])


    const province = useContext(ProvinceContext)
    const selectOptions = Object.values(province).map((item: any) => ({ label: item, value: item }))

    const [options, setOptions] = useState([
        { label: '物理', value: '物理' },
        { label: '化学', value: '化学' },
        { label: '生物', value: '生物' },
        { label: '政治', value: '政治' },
        { label: '历史', value: '历史' },
        { label: '地理', value: '地理' },
        { label: '技术', value: '技术' },
    ]);

    const onChange = (checkedValues: Array<string>) => {
        console.log('checked = ', checkedValues);
        if (checkedValues.length === 3) {
            const newOptions = options.map(opt => {
                if (checkedValues.includes(opt.value)) {
                    return { ...opt, disabled: false }
                }
                return { ...opt, disabled: true }
            })
            setOptions(newOptions)
        } else {
            const newOptions = options.map(opt => {
                return { ...opt, disabled: false }
            })
            setOptions(newOptions)
        }
    };

    const onNumIptChange = (value: any) => {
        console.log('changed', value);
    };
    const onFieldsChange = (changedFields: any) => {
        console.log('changedFields', changedFields);
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    const onFinish = async (values: any) => {
        setModalOpen(false)
        setInfo({ values, isFirst: false, modify: !info.modify })
        const res = await axiosInstance.post('/updataGaokaoInfo', {
            username: username,
            province: values.province,
            subjects: values.subjects.join(','),
            score: `${values.score}`,
            rank: `${values.rank}`,
            isFirst: 0,
        })
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '更新高考信息失败',
            });
        }

        console.log('Form values', values);
    }

    const onCancel = () => {
        const { values } = info
        console.log('rest', values)
        form.setFieldsValue(values)
        onChange(info.values.subjects)
        setModalOpen(false)
    }


    return (
        <>
            {contextHolder}
            <Modal
                title={<div style={{ fontSize: '20px', marginBottom: '25px' }}>填写您的高考信息</div>}
                centered
                open={modalOpen}
                footer={null}
                // onOk={() =>  setModalOpen(false)}
                onCancel={onCancel}
            >
                <Form
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                    initialValues={info.values}
                    onFinishFailed={onFinishFailed}
                    form={form}
                >
                    <Space direction="vertical" size={15}>
                        <Form.Item label="高考省份" name='province' colon={false}>
                            <Select options={selectOptions} style={{ width: 120 }} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: '请选择 3 门高考科目', type: 'array', len: 3 }]} label="高考科目" name='subjects' colon={false}>
                            <Checkbox.Group options={options} onChange={onChange} />
                        </Form.Item>
                        <Space size={50}>
                            <Form.Item rules={[{ required: true, message: '请输入分数', type: 'number' }]} className={styles.numIptBox} name={'score'} label="分数" colon={false}>
                                <InputNumber addonAfter="分" onChange={onNumIptChange} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: '请输入排名，范围在 1-100000', type: 'number', min: 1, max: 100000 }]} className={styles.numIptBox} name={'rank'} label="排名" colon={false}>
                                <InputNumber addonAfter="名" onChange={onNumIptChange} />
                            </Form.Item>
                        </Space>
                        <Form.Item>
                            <div className={styles.btnBox} >
                                <Button type="primary" onClick={onCancel} >
                                    取消
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    确定
                                </Button>
                            </div>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>

        </>

    )
}
