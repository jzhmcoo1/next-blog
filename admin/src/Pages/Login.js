import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button, Spin } from 'antd'
import '../static/css/Login.css'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

function Login() {

    const [userName, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const checkLogin = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="JSPang blog System" bordered={true} style={{ width: 400 }}>
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
                        onChange={(e) => { setPassWord(e.target.value) }}
                    ></Input.Password>
                    <br /><br />

                    <Button type="primary" size="large" block onClick={checkLogin}>Login</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login