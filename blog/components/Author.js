import { Avatar, Divider } from 'antd'
import '../public/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'

const Author = () => {

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://gitee.com/jzhmcoo1/jzhmcoo1picrepo/raw/master/img/avatar.jpg" /></div>
            <div className="author-introduction">
                希望人没事🙏🏻🙏🏻🙏🏻
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account" />
                <Avatar size={28} icon={<QqOutlined />} className="account" />
                <Avatar size={28} icon={<WechatOutlined />} className="account" />
            </div>
        </div>
    )

}

export default Author