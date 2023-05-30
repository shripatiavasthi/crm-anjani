import * as React from 'react';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
    const { onClick, text, css,color,variant } = props
    return (
        <div className={css ? css : ""}>
            <Button color={color ?? 'primary'} type='submit' variant={variant ?? 'outlined'} onClick={onClick} >{text}</Button>
        </div>
    );
}