
import React, { Component } from 'react';
import axios from 'axios';
import Note from './components/Note';
import './App.css';



class App extends Component {

    // We're going to setup our React state of our component
    constructor(props) {
        super(props);
        this.state = {
            noteContent: '',
            notes: [],
            userID: '',
            groupID: '',
        }
    }

    componentDidMount(){
        axios.get('https://avetiq-test.firebaseapp.com/user/movses_poghosyan')
            .then(response => {
                this.setState({userID: response.data.userId});
                console.log('UserID->',response.data.userId);
            });

        axios.get('https://avetiq-test.firebaseapp.com/group/movses_poghosyan')
            .then(response => {
                this.setState({groupID: response.data.groupId});
                console.log('GroupId->', response.data.groupId);
            });
/*        let URL =`https://avetiq-test.firebaseapp.com/todos/group/${this.state.groupID}/user/${this.state.userID}`;
        axios.put(URL)
            .then(response => {
                console.log(response.data)
            })*/
    }


    updateNoteText(noteContent){
        this.setState({noteContent: noteContent.target.value})
    }

    // componentWillMount(){
    //     const previousNotes = this.state.notes;
    //     this.db.on('child_added', snap => {
    //         previousNotes.push({
    //             id: snap.key,
    //             noteContent: snap.val().noteContent,
    //         })

    //         this.setState({
    //             notes: previousNotes
    //         })
    //     })
    // }

    addNote(){
        if(this.state.noteContent === '') {return}

        let notesArr = this.state.notes;
        notesArr.push(this.state.noteContent);
        this.setState({noteContent: ''});
        this.textInput.focus();

       // this.db.push().set({noteContent: note})
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            let notesArr = this.state.notes;
            notesArr.push(this.state.noteContent);
            this.setState({noteContent : ''});
        }
        let URL =`https://avetiq-test.firebaseapp.com/todos/group/${this.state.groupID}/user/${this.state.userID}`;
        axios.post(URL)
            .then(response => {
                console.log(response.data)
            })
    }

    deleteNote(index) {
        let notesArr = this.state.notes;
        notesArr.splice(index, 1);
        this.setState({notes: notesArr})
    }

    render() {

       const notes = this.state.notes.map((val, key) => {
          return <Note key={key}
                       text={val}
                       deleteMethod={() => this.deleteNote(key)}
                  />
              })

        return (
            <div className="container">
                <div className="header">React Todo application</div>
                {notes}
                <div className="btn" onClick={this.addNote.bind(this)}>+</div>
                <input type="text"
                       ref={((input) => {this.textInput = input})}
                       className="textInput"
                       value={this.state.noteContent}
                       onChange={noteContent => this.updateNoteText(noteContent)}
                       onKeyPress={this.handleKeyPress.bind(this)}
                />
            </div>
        );
    }
}

export default App;
