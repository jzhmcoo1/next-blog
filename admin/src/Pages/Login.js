import React, { useState, useEffect, createContext } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin, message } from 'antd'
import '../static/css/Login.css'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import servicePath from '../config/apiUrl'
import axios from 'axios'

const openIdContext = createContext()

function Login(props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        //检查是否已经登录
        let openId = localStorage.getItem('openId')
        let dataProps = { 'openId': openIdContext }
        console.log(openId)
        if (openId) {
            axios({
                method: 'post',
                url: servicePath.checkOpenId,
                data: dataProps,
                withCredentials: true,
            }).then(
                res => {
                    console.log(res)
                    if (res.data.data) {
                        message.success('已经登录')
                        props.history.push('/index')
                    }
                }
            )

        }
    }, [])

    const checkLogin = () => {
        setIsLoading(true)

        if (!userName) {
            message.error('用户名不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        } else if (!password) {
            message.error('密码不能为空')
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return false
        }
        let dataProps = {
            'userName': userName,
            'password': password
        }
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true,
        }).then(
            res => {
                setIsLoading(false)
                if (res.data.data === '登录成功') {
                    console.log('登录成功')
                    localStorage.setItem('openId', res.data.openId)
                    props.history.push('/index')
                } else {
                    message.error('用户名密码错误')
                }
            }
        )
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="Next Blog Login" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={
                            <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        onChange={(e) => { setUserName(e.target.value) }}
                    ></Input>
                    <br></br>
                    <br></br>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={
                            <KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></Input.Password>
                    <br /><br />

                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login