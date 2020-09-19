import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon, Breadcrumb, Affix, BackTop, Spin, Card } from 'antd'
import axios from 'axios'
import Header from '../components/Header'
import '../public/pages/index.css'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons'



const Home = (list) => {

  const [mylist, setMylist] = useState(list.data)
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div>
      <Head>
        <title>首页 | Next</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>


      <Row className="comm-main" type="flex" justify="center">
        <Col xs={24} sm={24} md={18}  >


          <div className="comm-left" >


            <List
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
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOpenOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.view_count}人</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            >
            </List>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6} >
          <Author />
        </Col>
      </Row>
      <Footer />
      <BackTop />
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home