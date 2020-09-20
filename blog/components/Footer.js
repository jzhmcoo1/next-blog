import '../public/components/footer.css'
import Link from 'next/link'


const Footer = () => (
    <div className="footer-div">
        <div>系统由
        <Link href=""><a>React</a></Link>+
        <Link href=""><a>Node</a></Link>+
        <Link href=""><a>Ant Design</a></Link>
        驱动</div>
        <div>
            <Link href="http://www.lihangzhu.com:3000">
                <a>Next Blog</a>
            </Link>
            By
            <Link href="https://www.lihangzhu.com">
                <a>Lixing</a>
            </Link>
        </div>
    </div>
)

export default Footer