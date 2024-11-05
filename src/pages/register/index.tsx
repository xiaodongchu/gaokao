import React, { useState } from 'react'
import styles from './index.module.css'
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import { Form, Input, Button, message, Space, Checkbox, Tabs } from 'antd'
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from "../../router/axiosInstance";

export default function Register() {

    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values)
        const res = await axiosInstance.post('/register', values)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        } else {
            messageApi.open({
                type: 'error',
                content: res.data.message,
            });
        }
    }

    return (
        <div className={styles.container}>
            {contextHolder}
            <div className={styles.content}>
                <LoginForm
                    title={<h1 style={{ marginBottom: '50px' }}>注册高考志愿填报系统</h1>}
                    submitter={{
                        searchConfig: {
                            submitText: '注册'
                        }
                    }}
                    onFinish={onFinish}
                >
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'密码'}
                            rules={[
                                {
                                    required: true,
                                    min: 4,
                                    max: 10,
                                    message: '请输入密码！长度为 4-10位！',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="re_password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'再次密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请再次输入密码！',
                                },
                            ]}
                        />
                    </>

                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <Link to="/login"
                            style={{
                                float: 'right',
                                marginBottom: '24px'
                            }}
                        >
                            已有账号？ 登录
                        </Link>
                    </div>
                </LoginForm>
            </div>



        </div>

    )
}
