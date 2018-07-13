import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {

    constructor(props){
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
        this.noteDone = props.noteDone;
    }


    render() {
        return (
            <div className="note" onClick={this.props.deleteMethod}>
                {this.props.text}

            </div>
        );
    }
}

Note.propTypes = {
    noteContent: PropTypes.string,
    noteId: PropTypes.string,
    noteDone: PropTypes.bool,

}

export default Note;
