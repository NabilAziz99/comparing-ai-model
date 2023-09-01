import React from 'react';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from '../misc/ThemeModifiers';

function UserInput(props) {
    return (
        <div>
            <ThemeProvider theme={lightTheme}>
                <TextField
                    required
                    id="userInput"
                    type="text"
                    placeholder="Prompt"
                    label="Input"
                    onChange={props.changed}
                    value={props.currentTextInput}
                    multiline
                    maxRows={15}
                />
            </ThemeProvider>
        </div>
    );
}

export default UserInput;