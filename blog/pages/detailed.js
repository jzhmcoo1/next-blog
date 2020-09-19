import React from 'react'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix, BackTop } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import '../public/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import { CalendarOutlined, FireOutlined, FolderOpenOutlined } from '@ant-design/icons'

import servicePath from '../config/apiUrl'

const Detailed = (props) => {

    const tocify = new Tocify()
    const render = new marked.Renderer()

    render.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level)
        return `<a id=${anchor} href = "#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

    marked.setOptions({
        renderer: render,
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


    let html = marked(props.article_content)


    return (
        <>
            <Head>
                <title>Next | {props.title}</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} xs={24} sm={24} md={18}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>

                            <div className="list-icon center">
                                <span><CalendarOutlined />{props.addTime}</span>
                                <span><FolderOpenOutlined />{props.typeName}</span>
                                <span><FireOutlined />{props.view_count}</span>
                            </div>

                            <div
                                className="detailed-content"
                                dangerouslySetInnerHTML={{ __html: html }}
                            >
                            </div>

                        </div>

                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={6}>
                    <Author />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer />
            <BackTop />

        </>
    )
}

Detailed.getInitialProps = async (context) => {
    let date = new Date();


    let month = date.getMonth();
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = month + '/' + day + '/' + hour + ':' + minute + ':' + second


    console.log('----->' + time + ':Visit the details page,parameter=' + context.query.id)
    //把ID强制转换成数字

    let id = parseInt(context.query.id)


    const promise = new Promise((resolve) => {
        if (id) {
            axios(servicePath.getArticleById + id).then(
                (res) => {
                    // console.log(title)
                    if (res.data.data == 'id错误') {
                        console.log('ERROR.......')
                        resolve({ article_content: 'id ERROR' })
                    } else {
                        resolve(res.data.data[0])
                    }

                }
            )
        } else {
            console.log('error......')
            resolve({ article_content: 'Id Error' })

        }

    })
    return await promise
}

export default Detailed