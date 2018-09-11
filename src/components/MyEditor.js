import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
 
class MyEditor extends Component {
  
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.setState({ text: value });
    this.props.callbackFromParent(this.props.fieldName, this.state.text);
  }

  render() {
    //let value = '';
    let className = "text-editor";
    if(this.props.type)
    {
      if(this.props.type === 'quillSmall')
        className = 'text-editor-small'
      else if(this.props.type === 'quillBig')
        className = 'text-editor-big'
    }

    if(this.props.value){
      if(this.state.text === '')
        this.setState({text: this.props.value});
    }
    return (
      <div className={className}>
        <ReactQuill
            theme={'snow'}
            onChange={this.handleChange}
            value={this.state.text}
            modules={MyEditor.modules}
            placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

/* 
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
MyEditor.modules = {
  toolbar: {
      container:
      [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['link', 'image'],
      
        ['clean']                                        // remove formatting button
         
      ],
      handlers: {
          "placeholder": function (value) { 
              if (value) {
                  const cursorPosition = this.quill.getSelection().index;
                  this.quill.insertText(cursorPosition, value);
                  this.quill.setSelection(cursorPosition + value.length);
              }
          },
          'image': this.imageHandler
      }
  }
}

MyEditor.imageHandler = (image, callback) => {
  var range = this.quillRef.getEditor().getSelection();
  var value = prompt('What is the image URL');
  if(value) {
      this.quillRef.getEditor().insertEmbed(range.index, 'image', value, "user");
  }
}

/* 
* PropType validation
*/
MyEditor.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}


export default MyEditor;