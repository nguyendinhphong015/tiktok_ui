import classNames from "classnames/bind"
import { Link } from "react-router-dom";
import styles from "./Button.module.scss"

const cx = classNames.bind(styles)
function Button({ to, href, onClick, outline = false, primary = false, small = false, rounded = false, text = false, disable = false, large = false, className, leftIcon, rightIcon, children, ...passProps }) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    };

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && props[key] === 'function') {
                delete props[key]
            }
        })
    }
    if (to) {
        props.to = to;
        Comp = Link;
    }
    else if (href) {
        props.href = href;
        Comp = 'a';
    }


    const classes = cx('wrapper', { primary, outline, small, large, text, rounded, [className]: className, disable });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )
}
export default Button