import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb, message } from 'antd';
import {
    // DesktopOutlined,
    // PieChartOutlined,
    FileOutlined,
    // TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };

    const handleClickArticle = e => {
        if (e.key == 'addArticle') {
            props.history.push('/index/add')
        } else {
            props.history.push('/index/list')
        }
    }

    const handleClickComment = () => {
        message.error('留言系统正在维护...')
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['articleList']} mode="inline">

                    <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleClickArticle}>
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="comment" icon={<FileOutlined />} onClick={handleClickComment}>留言管理</Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Route path="/index/" exact component={AddArticle}></Route>
                            <Route path="/index/add/" exact component={AddArticle}></Route>
                            <Route path="/index/list/" exact component={ArticleList}></Route>
                            <Route path="/index/add/:id" exact component={AddArticle}></Route>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Next 博客后台管理<br />
                    Lixing.com
                </Footer>
            </Layout>
        </Layout >
    );
}

export default AdminIndex