
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';


const cx = classNames.bind(styles)

const defaultFn = () => { }

function Menu({ children, items = [], onChange = defaultFn }) {
    // khai báo renderItems , nhận dữ liệu từ biến items đã khai báo từ bên layout/index.js
    //sau đó gọi hàm menuitem cùng cấp , sau đó cho biến data đã có sẵn gán dữ liệu vào chính là biến item để nhận dữ liệu từ nó 

    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1]


    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return <MenuItem key={index} data={item}
                onClick={() => {
                    if (isParent) {
                        setHistory((prev) => [...prev, item.children])
                    } else {
                        onChange(item)
                    }
                }} />
        })
    }
    return (
        <Tippy
            delay={[0, 700]}
            offset={[12, 8]}
            interactive
            placement='bottom-end'
            render={attrs => (
                <div className={styles['menu-list']} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title='Language' onBack={() => {
                            setHistory(prev => prev.slice(0, prev.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            //onhide giúp sau khi click khỏi menu nó sẽ tự động trả về trang 1
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}
export default Menu;