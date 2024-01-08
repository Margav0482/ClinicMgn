import { Input, IconButton, FormControl, InputLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = (props) => {
    return (
        <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
            <InputLabel>Password *</InputLabel>
            <Input
                type={props.isShow ? 'text' : 'password'}
                value={props.data}
                onChange={props.handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={props.handleClickShowPassword}
                        >
                            {props.isShow ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <p style={{ color: "red" }}>{props?.click && props?.eMessage !== "" && props?.data === "" ? props?.eMessage : props.newError}</p>
        </FormControl>
    )
}

export default PasswordInput