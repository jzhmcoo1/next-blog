import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import '../public/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

const Home = (list) => {

  const [mylist, setMylist] = useState(list.data)

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.title}</span>
                    <span><Icon type="folder" /> {item.addTime}</span>
                    <span><Icon type="fire" /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            >
            </List>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios('http://127.0.0.1:7001/default/getArticleList').then(
      (res) => {
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home