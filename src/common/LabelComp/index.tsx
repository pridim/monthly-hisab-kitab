import React from 'react'
import { Box } from '@mui/material';

interface LabelCompProps {
    label: string;
}

export default function TextLabel(props: LabelCompProps) {
    const { label } = props;
    return <Box component="h3" mb={.5}>{label}</Box>
}