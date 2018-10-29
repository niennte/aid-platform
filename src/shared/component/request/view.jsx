// @flow
/* eslint-disable */

import React from 'react';
// import { NavLink } from 'react-router-dom';
import { EditorState, convertToRaw } from 'draft-js'; // convertFromRaw,
import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import { LOGIN_PAGE_ROUTE } from '../../routes';

class RequestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // comment: '',
      editorState: EditorState.createEmpty(),
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { editorState } = this.state;
    const convertedData = convertToRaw(editorState.getCurrentContent());
    alert('see console:)');
    console.log(convertedData);
    // this.props.createComment(
    //   {
    //     content: convertedData,
    //     user_id: this.props.userId,
    //     revision_id: parseInt(this.props.revisionId, 2),
    //   },
    //   this.props.projectId,
    // );
    this.setState({ editorState: EditorState.createEmpty() });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChange = editorState => this.setState({ editorState });

  render() {
    const { editorState } = this.state;
    return (
      <main>
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div>
            <div className="card position-relative" style={{ width: '25rem' }}>
              <div className="card-body">

                <h5 className="text-primary">Publish an Aid Request</h5>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="editorContent border border-light"
                  toolbarClassName="toolbar-class"
                  onEditorStateChange={this.onChange}
                  toolbar={{
                    options: ['inline', 'list', 'colorPicker', 'link', 'emoji', 'image'],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                />

                <div id="comment-button-div">
                  <button className="btn btn-primary" type="button" onClick={this.handleSubmit} id="comment-submit-button" color="teal">Publish</button>
                </div>

              </div>
            </div>
          </div>

        </section>
      </main>
    );
  }
}


export default RequestView;
