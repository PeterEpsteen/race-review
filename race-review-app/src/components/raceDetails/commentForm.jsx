import React, { Component } from 'react';
import './commentForm.css';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentBody: '',
            disableSubmit: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({commentBody: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({disableSubmit: true});
        console.log(this.state.commentBody);
        if(this.state.commentBody.length > 10) {
            this.props.submitComment(this.state.commentBody);
        }
        setTimeout(() => this.setState({disableSubmit: false}), 5000);
    }
    render() {
        return (
        <div className="container commentForm">
        <form onSubmit={this.handleSubmit}>
            <textarea 
                type="text" 
                value={this.state.commentBody} 
                onChange={this.handleChange}/>
            <span>{`${this.state.commentBody.length} /256`}</span>
            <input disabled={this.state.disableSubmit} type="submit" value="Submit"/>
        </form>
        </div>
        );
    }
}
export default CommentForm;