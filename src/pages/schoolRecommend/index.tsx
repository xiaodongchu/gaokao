import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import { ProvinceContext, gaokaoContext } from '../../utils/context';
import { Form, Radio, message, Space, Card, Image, Divider, Pagination, Button, Result, Select, Spin } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from "../../router/axiosInstance";
export default function SchoolRecommend() {

    const [schoolList, setSchoolList] = useState([])
    const [filterList, setFilterList] = useState([])
    const [total, setTotal] = useState(1)
    const [page, setPage] = useState(1)
    const [levelValue, setLevelValue] = useState('全部')
    const [selectProvince, setSelectProvince] = useState('全部')
    const [riskValue, setRiskValue] = useState('全部')
    const [loading, setLoading] = useState(true)

    const province = useContext(ProvinceContext);
    const { info } = useContext(gaokaoContext);
    const provinceOptions = Object.values(province).map((item: any) => ({ label: item, value: item }))
    provinceOptions.unshift({ label: '全部', value: '全部' })

    const [messageApi, contextHolder] = message.useMessage();

    const loadSchoolList = async () => {
        setLoading(true)
        const res = await axiosInstance.post('/recommend', {
            choose_list: info.values.subjects.toString(),
            rank: info.values.rank,
            province: info.values.province,
        })
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '加载推荐院校成功',
            });
            console.log(res.data)
            setSchoolList(res.data.data)
            setTotal(res.data.data.length)
        } else {
            messageApi.open({
                type: 'error',
                content: '加载推荐院校失败',
            });
        }
        setLoading(false)

    }

    useEffect(() => {
        const newArray = schoolList.filter((item: any) => {
            if (selectProvince !== '全部' && item.province !== selectProvince) return false
            if (levelValue === '985' && item.f985 === 0) return false
            if (levelValue === '211' && item.f211 === 0) return false
            if (levelValue === '双一流' && item.dual_class === 0) return false
            if (riskValue !== '全部' && item.risk !== riskValue) return false
            return true
        })
        const res = newArray.slice((page - 1) * 10, page * 10)
        setFilterList(res)
        setTotal(newArray.length)
        console.log(total)
    }, [levelValue, selectProvince, riskValue, schoolList, page])


    useEffect(() => {
        if (info.isFirst) return
        loadSchoolList()
    }, [info.isFirst, info.modify])

    const navigate = useNavigate();

    const onLevelChange = (e: any) => {
        console.log('radio', e.target.value)
        setLevelValue(e.target.value)
        setPage(1)
    }
    const onRiskChange = (e: any) => {
        console.log('radio', e.target.value)
        setRiskValue(e.target.value)
        setPage(1)
    }

    const onSelect = (value: any) => {
        console.log('select', value)
        setSelectProvince(value)
        setPage(1)

    }
    const onPageChange = (page: number) => {
        setPage(page)
        console.log('page change', page)
    }

    const handleClick = async ({ school_name, school_id, risk ,special_name}: any, e: any) => {
        e.stopPropagation();
        const res = await axiosInstance.post('/addVolunteer', {
            school_name: school_name,
            special_name: special_name,
            school_id: school_id,
            risk: risk
        })
        console.log(res.data)
        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: res.data.message,
            });
        } else if (res.data.code === 400) {
            messageApi.open({
                type: 'error',
                content: res.data.message,
            });
        }
        console.log('radio checked', e.target.value);

    }

    const render211 = (item: any) => {
        if (item.f985 === '1') {
            return (
                <>
                    985
                    <Divider type="vertical" />
                </>
            );
        } else if (item.f211 === '1') {
            return (
                <>
                    211
                    <Divider type="vertical" />
                </>
            );
        }
        // 如果没有符合的条件，可以返回 null 或者其他内容
        return null;
    };

    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.schoolSearch}>
                    <Radio.Group onChange={onRiskChange} value={riskValue} buttonStyle="solid">
                        <Radio.Button value="全部">全部</Radio.Button>
                        <Radio.Button value="高">高</Radio.Button>
                        <Radio.Button value="中">中</Radio.Button>
                        <Radio.Button value="低">低</Radio.Button>
                    </Radio.Group>
                </div>

                <div className={styles.schoolList}>
                    <Space style={{ display: 'flex' }} direction='vertical' size={'middle'}>
                        {
                            loading ? <Spin size="large" /> : filterList.length === 0 ?
                                <Result
                                    status="warning"
                                    title="没有符合条件的院校"
                                />
                                :
                                filterList.map((item: any) => {
                                    return (
                                        <Card
                                            key={item.id+item.special_name}
                                            hoverable
                                            className={styles.schoolCard}
                                            classNames={{ body: styles.antdCardBody }}
                                            onClick={() => {
                                                navigate(`/school/${item.id}`)
                                            }}
                                        >
                                            <Image
                                                width={50}
                                                src={`http://10.242.61.169:8000/images/${item.id}.jpg`}
                                            />
                                            <div className={styles.schoolBasic}>
                                                <div className={styles.title}>
                                                    <div className={styles.name}>{item.name}</div>
                                                    <div className={styles.address}>{item.special_name}</div>
                                                </div>
                                                <div className={styles.info}>
                                                    {render211(item)}
                                                    {item.dual_class === '1' ?
                                                        <>
                                                            双一流
                                                            <Divider type="vertical" />
                                                            <br/>
                                                        </>
                                                        : null}
                                                    {parseInt(item.rank) + 1}
                                                    <Divider type="vertical" />
                                                    <span style={{ color: 'red' }}>{item.risk}</span>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={(e) => handleClick({ school_name: item.name, school_id: item.id, risk: item.risk ,special_name:item.special_name}, e)}
                                                className={styles.button}
                                                type="primary">
                                                +
                                            </Button>
                                        </Card>
                                    )

                                })
                        }
                    </Space>
                </div>
                <Pagination className={styles.pagination} current={page} onChange={onPageChange} total={total} />

            </div>
        </>

    )
}
