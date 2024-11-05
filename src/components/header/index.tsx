import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ProvinceContext, gaokaoContext } from '../../utils/context'
import styles from './index.module.css'
import { Button, Divider, Modal, Form, message, Menu, Input, Tooltip, Select, Checkbox, InputNumber, Space } from 'antd'
import axios from 'axios'
import InfoModal from '../infoModal'
import VolunModal from '../volunModal'

export default function Header() {

    const username = localStorage.getItem('username') || 'zzz'
    const [modalOpen, setModalOpen] = useState(false);
    const [volunModalOpen, setVolunModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate()
    useEffect(() => {

        console.log('modalOpen', modalOpen)
    }, [modalOpen])

    const onMenuClick = (e: any) => {
        if (e.key === 'logout') {
            messageApi.open({
                type: 'success',
                content: '退出登录成功'
            });
            localStorage.removeItem('username')
            localStorage.removeItem('token')
        } else if (e.key === 'myvolunteer') {
            setVolunModalOpen(true)
        }
    }

    const items = [
        {
            label: username,
            key: 'school',
            children: [
                {
                    label: 'logout',
                    key: 'logout',
                },
                {
                    label: '我的志愿表',
                    key: 'myvolunteer',
                },
            ]
        },
    ];
    const [isCollapsed, setIsCollapsed] = useState(true); // 初始状态为折叠

    const { info, setInfo } = useContext(gaokaoContext)
    console.log('header info', info)

    return (
        <>
            {contextHolder}
            <div className={styles.header}>
                <menu>
                    <Link to="/school">高校</Link>
                    <Link to="/special">专业</Link>
                    <Link to="/recommend">志愿推荐</Link>
                </menu>
                <div className={styles.info}>
                    {info.isFirst === 1 ? <span style={{ marginRight: '10px' }}>请先填写高考信息</span>
                        :
                        <div style={{ margin: '0 5px' }} onClick={() => setModalOpen(true)} className={styles.gaokaoInfo} >
                            <Tooltip title="点击编辑高考信息">
                                {info.values.province}
                                <Divider style={{margin: '0 5px'}} type="vertical"/>
                                {info.values.rank}名
                                <Divider style={{margin: '0 5px'}} type="vertical"/>
                                <br/>
                                {info.values.subjects}
                            </Tooltip>
                        </div>
                    }
                    <div className={styles.menu1}>
                        <Menu style={{ backgroundColor: 'inherit' }} onClick={onMenuClick} items={items} mode="horizontal" />
                    </div>
                </div>
                <VolunModal volunModalOpen={volunModalOpen} setVolunModalOpen={setVolunModalOpen} />
                <InfoModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div >
        </>



    )
}
