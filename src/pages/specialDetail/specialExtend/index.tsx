import React from 'react'
import { Space, Typography, Card } from 'antd'
import styles from './index.module.css'

const { Title, Paragraph } = Typography

export default function SpecialExtend({ specialDetail }: { specialDetail: any }) {
    return (
        <div className={styles.container}>
            <Space style={{ width: '100%' }} size={'middle'} direction='vertical'>
                <Card style={{ width: '100%' }} hoverable>
                    <Typography>
                        <Title level={3}>选考学科建议</Title>
                        <Paragraph style={{ fontSize: '16px' }}>{specialDetail.sel_adv}</Paragraph>

                    </Typography>
                </Card>
                <Card style={{ width: '100%' }} hoverable>
                    <Typography>
                        <Title level={3}>开设课程</Title>
                        <Paragraph style={{ fontSize: '16px' }}>{specialDetail.course}</Paragraph>

                    </Typography>
                </Card>
                <Card style={{ width: '100%' }} hoverable>
                    <Typography>
                        <Title level={3}>考研方向</Title>
                        <Paragraph style={{ fontSize: '16px' }}>{specialDetail.direction}</Paragraph>

                    </Typography>
                </Card>
                <Card style={{ width: '100%' }} hoverable>
                    <Typography>
                        <Title level={3}>社会名人</Title>
                        <Paragraph style={{ fontSize: '16px' }}>{specialDetail.celebrity}</Paragraph>
                    </Typography>
                </Card>

            </Space>
        </div>
    )
}
