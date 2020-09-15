import React from 'react'
import '../public/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'

const Header = () => (
    <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">Lixing</span>
                <span className="header-txt">软工带学生</span>
            </Col>

            <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home">
                        {/* <Icon type="home" /> */}
                        <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key="video">
                        {/* <Icon type="youtube" /> */}
                        <YoutubeOutlined />
                        视频
                    </Menu.Item>
                    <Menu.Item key="life">
                        {/* <Icon type="smile" /> */}
                        <SmileOutlined />
                        生活
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)

export default Header