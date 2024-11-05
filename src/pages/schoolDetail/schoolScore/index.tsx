import React, { useContext, useState, useEffect } from 'react'
import styles from './index.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { Select, Table, Result, message } from 'antd'
import { ProvinceContext } from '../../../utils/context'
import axios from 'axios'
import axiosInstance from "../../../router/axiosInstance";
export default function SchoolScore() {
    const navigate = useNavigate()
    const { schoolId } = useParams()
    const [schoolList, setSchoolList] = useState([])
    const [selectYear, setSelectYear] = useState('2022')
    const [selectProvince, setSelectProvince] = useState('北京')
    const [messageApi, contextHolder] = message.useMessage();

    const yearSelectOption =
        ['2017', '2018', '2019', '2020', '2021', '2022', '2023','2024'].map((item: any) => ({ value: item, label: item }))

    const province = useContext(ProvinceContext)
    const provinceSelectOption = Object.values(province).map((item: any) => ({ value: item, label: item }))

    const onYearSelect = (value: string) => {
        console.log('year', value)
        setSelectYear(value)
    }

    const onProvinceSelect = (value: string) => {
        console.log('province', value)
        setSelectProvince(value)
    }

    const loadSchoolSpecialList = async () => {
        const res = await axiosInstance.post('/getSchoolSpecialPlan', {
            schoolId: schoolId,
            year: selectYear,
            province: selectProvince
        })

        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '获取学校专业计划成功',
            });
            console.log(res.data.data)
            setSchoolList(res.data.data)
        } else {
            messageApi.open({
                type: 'error',
                content: '获取学校专业信息失败',
            });
        }

    }

    useEffect(() => {
        loadSchoolSpecialList()
    }, [selectYear, selectProvince])

    const columns = [
        {
            title: '专业名称',
            dataIndex: 'zymc',
            className: 'azymc',
            key: 'zymc',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '录取批次',
            dataIndex: 'lqpc',
            key: 'lqpc',
        },
        {
            title: '招生类型',
            dataIndex: 'zslx',
            key: 'zslx',
        },
        {
            title: '最低分',
            dataIndex: 'zdf',
            key: 'zdf',
        },
        {
            title: '最低位次',
            key: 'zdwc',
            dataIndex: 'zdwc',
        },
        {
            title: '选科要求',
            key: 'xkyq',
            dataIndex: 'xkyq',
        }
    ];

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.selectContainer}>
                    <Select style={{ width: '30%' }} onSelect={onYearSelect} value={selectYear} options={yearSelectOption} />
                    <Select style={{ width: '30%' }} onSelect={onProvinceSelect} value={selectProvince} options={provinceSelectOption} />
                </div>
                {
                    schoolList.length === 0 ?
                        <Result
                            status="warning"
                            title="没有符合条件的专业"
                        /> :
                        <Table
                            className={styles.table}
                            columns={columns}
                            dataSource={schoolList.map((item: any, index: number) => (
                                {
                                    key: item.code === null ? index : item.code,
                                    zymc: item.name,
                                    lqpc: item.batch,
                                    zslx: item.type,
                                    zdf: item.score,
                                    zdwc: item.rank,
                                    xkyq: item.require,
                                }
                            ))}
                        />
                }

            </div>
        </>

    )
}
