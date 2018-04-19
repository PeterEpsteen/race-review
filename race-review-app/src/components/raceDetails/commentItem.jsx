import React, {Component} from 'react';
import './commentItem.css'

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReply: false,
            reply: {
                body: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({reply: {
            body: e.target.value
        }});
    }
    renderReply() {
        if (this.state.showReply) {
            return (
                <div className="row">
                    <textarea value={this.state.reply.body} onChange={this.handleChange} name="reply" rows="10"></textarea>
                </div>
            );
        }
    }
    render() {
        const comment = this.props.comment;
        const date = new Date(comment.date);
        const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
        return (
        <div className="commentContainer">
            <div className="commentItem">
                <div className="row">
                    <span>
                        {comment.body}
                    </span>
                    <span>
                        Posted by:
                        {comment.user.username} on {dateString}
                    </span>
                </div>
                <div className="row">
                    <button onClick={() => this.setState({showReply: !this.state.showReply})}>Reply</button>
                </div>
            </div>
            {this.renderReply()}
        </div>
    );
    }
}

const commentChild = ({comment}) => {
    const date = new Date(comment.date);
    const dateString = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
   return (
        <div className="commentChild">
            <div className="row">
                <span>
                    {comment.body}
                </span>
                <span>
                    {dateString}
                </span>
            </div>
        </div>
   );
}

export default CommentItem;