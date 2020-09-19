import React, { useState, useEffect } from 'react'
import '../public/components/header.css'
import { Row, Col, Menu } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { HomeOutlined } from '@ant-design/icons'
import * as Icon from '@ant-design/icons'

const Header = () => {

    const [navArray, setNavArray] = useState([])
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        let num = e.key.replace('item_', '')
        console.log(num)
        if (num == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + num)
        }
    }


    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={13}>
                    <span className="header-logo">Next</span>
                    <span className="header-txt">由next.js生成的博客系统demo</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={11}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0" icon={<HomeOutlined />}>
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        {
                                            React.createElement(
                                                Icon[item.icon]
                                            )
                                        }
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header