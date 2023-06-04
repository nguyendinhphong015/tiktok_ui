import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion, faCircleXmark, faCloudUpload, faCloudUploadAlt, faCoins, faEarthAsia, faEllipsisVertical, faGears, faKeyboard, faMagnifyingGlass, faMessage, faSignOut, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons'

import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import 'tippy.js/dist/tippy.css'; // optional

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss'
import images from '~/assets/images'
import AcountIteam from '~/components/AcountIteam';
import Menu from '~/components/Popper/Menu';
const cx = classNames.bind(styles)
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        //tạo cấp 2 của thẻ cha
        children: {
            title: 'language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt'
                },

            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

function Header() {

    const [searchResult, setSearchResult] = useState([])
    // nếu như có currentUser thì trả ra trạng thái đã login còn không thì trả về chưa login
    const currentUser = true

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])
    // handleMenuChange để xem sự thay đổi 
    const handleMenuChange = (menuIteam) => {
        switch (menuIteam.type) {
            case 'language':

                break;
            default:
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaa'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin'
        },
        {
            icon: <FontAwesomeIcon icon={faGears} />,
            title: 'Setting',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt='tiktok' />
                </div>

                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={attrs => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>
                                    Account
                                </h4>
                                <AcountIteam />
                                <AcountIteam />
                                <AcountIteam />
                                <AcountIteam />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder='Search accounts and videos ' spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                {/* nếu như có currentUser thì trả về thông tin đã login còn chưa thì trả về mặc định  */}
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy
                                content='Upload video'
                                placement='bottom'
                                delay={[0, 200]}
                            >
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )
                    }

                    <Menu
                        //items nhận 1 cái mảng là MENU_ITEMS
                        items={currentUser ? userMenu : MENU_ITEMS}
                        // bắt sự kiện thay đổi 
                        onChange={handleMenuChange}
                    >
                        {currentUser ? (

                            <img className={cx('user-avatar')}
                                alt='nguyen van a'
                                src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/39911deb09b62b80810dec42c0722bbd~c5_100x100.jpeg?x-expires=1686038400&x-signature=9nqyDtaaqQ152f3iIDXby1MFjMo%3D"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}

                    </Menu>
                </div >
            </div >
        </header >
    )
}
export default Header;