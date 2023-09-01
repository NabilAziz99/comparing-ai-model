import React from "react";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme from "../misc/ThemeModifiers";

function BabbageOuput(props) {
    return (
        <ThemeProvider theme={lightTheme}>
            <TextField
                style={{ width: "200%" }}
                type="text"
                defaultValue="... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volupt
                ate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cu
                pidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                label="Babbage Output Text"
                value={props.AiTextOutput}
                multiline
                maxRows={15}
                InputProps={{
                    readOnly: true,
                }}
            />
        </ThemeProvider>
    );
}

export default BabbageOuput;