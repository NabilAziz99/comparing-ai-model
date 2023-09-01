import React from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "../misc/ThemeModifiers";

function ApiKeyInput(props) {
  return (
    <div>
        <ThemeProvider theme={lightTheme}>
            <TextField
                required
                id="apiKeyInput"
                type="text" 
                placeholder="Api Key" 
                label="Api Key" 
                onChange={props.changed} 
                value={props.currentTextInput}
            />
        </ThemeProvider>
    </div>
  );
}

export default ApiKeyInput;