import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Spin, Affix, BackTop } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../public/pages/list.css'
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons'

import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const ArticleList = (list) => {

    const [mylist, setMylist] = useState(list.data);

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });

    useEffect(() => {
        setMylist(list.data)
    })

    return (
        <>
            <Head>
                <title>列表 | Next</title>
                <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
            </Head>
            <Affix offsetTop={0}>
                <Header />
            </Affix>

            <Row className="comm-main" type="flex" justify="center">
                <Col xs={24} sm={24} md={18}  >
                    <div className="comm-left">

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
                        />

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={6} >
                    <Author />
                </Col>
            </Row>
            <Footer />
            <BackTop />
        </>
    )

}

ArticleList.getInitialProps = async (context) => {

    let id = parseInt(context.query.id)
    const promise = new Promise((resolve) => {
        if (id) {
            axios(servicePath.getListById + id).then(
                (res) => resolve(res.data)
            )

        } else {
            console.log('error.....')
            resolve({ article_content: 'Id Error' })
        }
    })
    return await promise
}

export default ArticleList