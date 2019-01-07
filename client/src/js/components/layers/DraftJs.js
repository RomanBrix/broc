import React, {Component} from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
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

// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';
// import 'draft-js-image-plugin/lib/plugin.css';

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

        console.log(props.content);
        this.state = {
            editorState: props.content !== null ? EditorState.createWithContent(convertFromRaw(props.content)) : EditorState.createEmpty() ,
            // editorState: EditorState.createEmpty()
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);

    }

    componentWillReceiveProps(newProps){
        // console.log(this.props);
        console.log(this.props.content === null && newProps.content !== null);
        if(this.props.content === null && newProps.content !== null){
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(newProps.content))
            })
        }
    }
    onChange = (editorState) => {
        const { saveDraftJsContent } = this.props;
        this.setState({editorState,});
        saveDraftJsContent(convertToRaw(editorState.getCurrentContent()));

    };


    focus = () => {
        this.editor.focus();
    };


    makeSmth(arg){
        console.log(arg.toLowerCase());
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            arg.toLowerCase()
        ));
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        console.log(command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }


    render() {
        return (
            <div className="editor" onClick={this.focus}>
                <div className="controls">
                    <BlockStyleControls
                        editorState={this.state.editorState}
                        onToggle={this.toggleBlockType.bind(this)}
                    />
                </div>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                    handleKeyCommand={this.handleKeyCommand}

                />
                {/*<AlignmentTool />*/}
            </div>
        )
    }
}





const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    // {label: 'H5', style: 'header-five'},
    // {label: 'H6', style: 'header-six'},
    // {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    // {label: 'Code Block', style: 'code-block'},
    {label: 'Text', style: 'unstyled'},

];
class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <div className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </div>
        );
    }
}

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};




