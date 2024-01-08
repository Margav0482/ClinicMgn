import { Input, FormControl, InputLabel } from '@mui/material';

const TextInput = (props) => {
    return (
        <FormControl sx={{ m: 1, width: '90%' }} variant="standard">
            <InputLabel >{props?.label}</InputLabel>
            <Input
                autoFocus={props?.autoFocus}
                type={props?.type}
                value={props?.data ? props.data : ""}
                onChange={props?.handleChange(props?.change)}
                multiline={props?.multiline}
                error={props?.click && props?.eMessage !== "" && props?.data === ""}
                readOnly={props?.readOnly}
            />
            <p style={{ color: "red" }}>{props?.click && props?.eMessage !== "" && props?.data === "" ? props?.eMessage : props.newError}</p>
        </FormControl>
    )
}

export default TextInput;