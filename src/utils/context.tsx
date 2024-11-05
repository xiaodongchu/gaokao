import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import axiosInstance from "../router/axiosInstance";

export const ProvinceContext = createContext(
    {
        "11": "北京",
        "12": "天津",
        "13": "河北",
        "14": "山西",
        "15": "内蒙古",
        "21": "辽宁",
        "22": "吉林",
        "23": "黑龙江",
        "31": "上海",
        "32": "江苏",
        "33": "浙江",
        "34": "安徽",
        "35": "福建",
        "36": "江西",
        "37": "山东",
        "41": "河南",
        "42": "湖北",
        "43": "湖南",
        "44": "广东",
        "45": "广西",
        "46": "海南",
        "50": "重庆",
        "51": "四川",
        "52": "贵州",
        "53": "云南",
        "54": "西藏",
        "61": "陕西",
        "62": "甘肃",
        "63": "青海",
        "64": "宁夏",
        "65": "新疆"
    }
);


export const gaokaoContext = createContext<any>({})


export const GaokaoInfoProvider = ({ children }: { children: any }) => {

    const username = localStorage.getItem('username') || "zzz"
    console.log('GaokaoInfoProvider 第一次渲染', username)

    const initgaokaoInfo = {
        values: {
            province: '北京',
            subjects: [],
            score: 0,
            rank: 0,
        },
        isFirst: true,
        modify: false
    }
    const [info, setInfo] = useState<any>(initgaokaoInfo)

    const loadGaokaoInfo = async () => {
        const res = await axiosInstance.get(`/getGaokaoInfo`)

        const data = res.data.data
        const username = data.username
        localStorage.setItem('username', username)
        console.log('gaokaoinfo', data)
        const gaokaoInfo = {
            values: {
                province: data.province,
                subjects: data.subjects,
                score: data.score,
                rank: data.rank,
            },
            isFirst: data.isFirst,
            modify: false
        }
        setInfo(gaokaoInfo)

    }

    useEffect(() => {
        if (!username) {
            console.log('username is ', username)
            return
        }
        loadGaokaoInfo()
    }, [username])

    return (
        <gaokaoContext.Provider value={{ info, setInfo }}>
            {children}
        </gaokaoContext.Provider>
    )
}