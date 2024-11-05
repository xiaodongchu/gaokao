import React, { useEffect, useState, useContext, useRef } from 'react'
import { Input, Card, Image, Divider } from 'antd'
import { Flex, Radio, Pagination, Select, Space, Result, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ProvinceContext } from '../../utils/context';
import axios from 'axios'
import styles from './index.module.css'
import axiosInstance from "../../router/axiosInstance";

const { Search } = Input
const { Meta } = Card

export default function SchoolInfo() {
    const [schoolList, setSchoolList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [iptValue, setIptValue] = useState('')
    const [selectProvince, setSelectProvince] = useState('全部')
    const [radioValue, setRadioValue] = useState('全部')
    const [curPage, setCurPage] = useState(1)
    const [numTotal, setNumTotal] = useState(0)
    const iptRef = useRef(null)
    const [messageApi, contextHolder] = message.useMessage();

    const province = useContext(ProvinceContext)
    const selectOptions = Object.values(province).map((item: any) => ({ label: item, value: item }))

    selectOptions.unshift({ label: '全部', value: '全部' })
    const loadSchoolList = async () => {
        console.log(selectProvince, searchValue, radioValue, curPage)
        const res = await axiosInstance.post('/getSchoolList', {
            province: selectProvince,
            school_name: searchValue,
            school_class: radioValue,
            page: curPage
        })

        if (res.data.code === 200) {
            messageApi.open({
                type: 'success',
                content: '获取院校列表成功',
            });
            console.log('total', res.data.data.total)
            setSchoolList(res.data.data.schoolList)
            setNumTotal(res.data.data.total)
        } else {
            messageApi.open({
                type: 'error',
                content: '获取院校列表失败',
            });
        }

    }

    const onSearch = (value: string) => {
        console.log('search', value)
        setCurPage(1)
        setSearchValue(value)
    }
    const onChange = (page: any, pageSize: any) => {
        setCurPage(page)
        console.log('page', page, 'pageSize', pageSize)
    }
    const onRadioChange = (e: any) => {
        console.log('radio', e.target.value)
        setCurPage(1)
        setRadioValue(e.target.value)
    }

    const onselect = (value: any) => {
        console.log('select', value)
        setCurPage(1)
        setSelectProvince(value)
    }

    const onResultClick = () => {
        setSearchValue('')
        setIptValue('')
        setCurPage(1)
        setSelectProvince('全部')
        setRadioValue('全部')
    }

    useEffect(() => {
        loadSchoolList().then(r => console.log('load'))
    }, [searchValue, selectProvince, radioValue, curPage])



    const navigate = useNavigate()


    return (
        <>
            {contextHolder}
            <div className={styles.container}>
                <div className={styles.schoolSearch}>
                    <Search
                        allowClear
                        placeholder="搜索院校"
                        onSearch={onSearch}
                        defaultValue={searchValue}
                        value={iptValue}
                        onChange={(e) => {
                            setIptValue(e.target.value)
                        }}
                        enterButton
                        className={styles.searchIpt}
                    />
                    <Select options={selectOptions} onSelect={onselect} style={{ width: '25%' }} value={selectProvince} />
                </div>

                <div className={styles.schoolList}>
                    <Space style={{ display: 'flex' }} size={'middle'} direction='vertical' >
                        {
                            schoolList.length === 0 ?
                                <Result
                                    status="warning"
                                    title="没有符合条件的院校"
                                    extra={
                                        <Button onClick={onResultClick} type="primary" key="console">
                                            重置搜索条件
                                        </Button>
                                    }
                                /> : schoolList.map((item: any) => (
                                    <Card
                                        key={item.id}
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
                                                <div className={styles.address}>{item.province}</div>
                                            </div>
                                            <div className={styles.info}>
                                                {item.f985 === '1' ?
                                                    <>
                                                        985
                                                        <Divider type="vertical" />
                                                    </>
                                                    : null}
                                                {item.f211 === '1' ?
                                                    <>
                                                        211
                                                        <Divider type="vertical" />
                                                    </>
                                                    : null}
                                                {item.dual_class === '1' ?
                                                    <>
                                                        双一流
                                                    </>
                                                    : null}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                        }
                    </Space>

                </div>
                <Pagination
                    className={styles.pagination}
                    defaultCurrent={1}
                    current={curPage}
                    total={numTotal}
                    onChange={onChange}
                />

            </div>

        </>



    )
}
