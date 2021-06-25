import React, { useState } from 'react'

import { TextField } from '@material-ui/core';
import MUIEditor, { MUIEditorState } from 'react-mui-draft-wysiwyg';
import axios from "axios";


function Example() {
   
    const [editorState, setEditorState] = React.useState(MUIEditorState.createEmpty());
 

    const onChange = (newState) => {
       
        setEditorState(newState);
    };


    return (
        <div>
       
            <TextField label='Title'
                fullWidth
                margin='normal'
                variant='filled'
                
            />
            <MUIEditor editorState={editorState} onChange={onChange} />
        </div>
    )
}
export default Example;