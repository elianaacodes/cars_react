import { forwardRef } from 'react'
import { TextField } from '@mui/material'

interface InputType {
  name: string,
  placeholder: string,
  type: string,
  pattern: string,

}

const Input = forwardRef((props: InputType, ref) => {
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        {...props} // 'spread operator'
    >
    </TextField>
  )
});

export default Input