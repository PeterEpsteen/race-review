import React, {Component} from 'react';
import CommentForm from './commentForm';
import './commentItem.css'

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReply: false,
        }
    }

    submitReplyComment(body) {
        this.props.submitReplyComment(body, this.props.comment._id);
        this.setState({showReply: false});
    }

    renderReply() {
        if (this.state.showReply) {
            return <CommentForm submitComment={this.submitReplyComment.bind(this)}/>
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
            {comment.children.map(child => <CommentChild comment={child} key={child._id}>{child.body}</CommentChild> )}
        </div>
    );
    }
}

const CommentChild = ({comment}) => {
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