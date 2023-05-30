import Button from "~/components/Button"
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'


const cx = classNames.bind(styles)

//tạo menu sau này còn nhiều menu item khác , nhận lấy data (data rỗng chưa có gì) , thẻ button đã khai báo từ trước , 1 hàng chính 
//là 1 hẻ button rỗng , thẻ button nhận lấy lefticon , link , và title tuy nhiên những cái này chỉ là thẻ rỗng chưa có data , 
//import thẻ menuIteam vào thẻ index cùng cấp để lấy data từ items 
function MenuItem({ data, onClick }) {
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={onClick}>{data.title}</Button>
    )
}
export default MenuItem