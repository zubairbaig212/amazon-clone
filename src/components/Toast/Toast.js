import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

export const Toast = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useImperativeHandle(ref, () => ({
        openNotification() {
            setOpen(false);
            setOpen(true);
        },
    }));

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const { vertical, horizontal } = { vertical: 'top', horizontal: 'right' };
    return (
        <div>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={200000}
                onClose={handleClose}
                message="Cart Added!"
                key={vertical + horizontal}
                action={action}
            />
        </div>
    )
}
)
