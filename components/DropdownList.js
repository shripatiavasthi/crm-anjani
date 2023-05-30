import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

    const { name, value, setvalue } = props

    return (
        <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={`${props.title}`}
                    onChange={(e) => setvalue(name,e.target.value)}
                >
                    {
                        props.children
                    }
                </Select>
            </FormControl>
        </Box>
    );
}