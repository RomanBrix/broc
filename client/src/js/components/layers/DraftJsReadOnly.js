import React, {Component} from 'react';
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
// import {
//     convertFromRaw,
//     EditorState,
// } from 'draft-js';

import createImagePlugin from 'draft-js-image-plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';

import createFocusPlugin from 'draft-js-focus-plugin';

import createResizeablePlugin from 'draft-js-resizeable-plugin';

import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';


// const imagePlugin = createImagePlugin();
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
// eslint-disable-next-line
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    // alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
    blockDndPlugin,
    focusPlugin,
    // alignmentPlugin,
    resizeablePlugin,
    imagePlugin
];



export default class DraftJs extends Component {
    constructor(props){
        super(props);

        // console.log(props.content);
        this.state = {
            editorState: props.content !== null ? EditorState.createWithContent(convertFromRaw(props.content)) : EditorState.createEmpty() ,
            // editorState: EditorState.createEmpty()
        };
        // this.handleKeyCommand = this.handleKeyCommand.bind(this);

    }

    componentWillReceiveProps(newProps){
        // console.log(this.props);
        // console.log(this.props.content === null && newProps.content !== null);
        if(this.props.content === null && newProps.content !== null){
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(newProps.content))
            })
        }
    }
    onChange = (editorState) => {
        // const { saveDraftJsContent } = this.props;
        this.setState({editorState,});
        // saveDraftJsContent(convertToRaw(editorState.getCurrentContent()));

    };







    render() {
        return (
            <div className="editor" onClick={this.focus}>

                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    readOnly={true}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
            </div>
        )
    }
}






