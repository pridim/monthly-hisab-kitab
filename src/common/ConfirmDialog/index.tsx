import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
    title: string;
    description: string;
    handleDialog: (open: boolean) => void;
    open: boolean;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
    const { title, description } = props;
    const [open, setOpen] = React.useState(props.open);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
                <Button onClick={() => props.handleDialog(true)} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
