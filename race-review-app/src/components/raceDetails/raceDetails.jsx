import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RaceDescription from './raceDescription';
import CommentForm from './commentForm';
import CommentItem from './commentItem'
import { getRace, rateRace, getComments, submitComment } from '../../actions/index';
import './raceDetails.css';

class RaceDetails extends React.Component {
    componentWillMount() {
        const pathArray = this.props.location.pathname.split('/');
        const _id = pathArray[pathArray.length - 1];
        this.props.getRace(_id);
        this.props.getComments(_id);
    }
    rateRace(numb) {
        const pathArray = this.props.location.pathname.split('/');
        const _id = pathArray[pathArray.length - 1];
        this.props.rateRace({raceId: _id, rating: numb});
    }
    submitComment(body) {
        this.props.submitComment({
            race: this.props.race,
            comment: {body}
        });
    }
    renderComments() {
        console.log(this.props.race);
        if (this.props.race.comments) {
            return this.props.race.comments.map(comment => {
                return <div>{comment.body}</div>
            });
        }
    }
    render () {
        const comments = (this.props.race.comments || []);
        if (comments.length > 0) {
            comments.sort((one, two) => {
                return new Date(two.date).valueOf() > new Date(one.date).valueOf();
            });
        }
        console.log(comments);
        if (this.props.race) {
            return (
                <div className="container raceDetails">
                    <div className="row">
                        <div className="col">
                            <RaceDescription
                                rateRace = {this.rateRace.bind(this)}
                                race={this.props.race} 
                                />
                            <CommentForm
                                submitComment={this.submitComment.bind(this)}
                                commentError={this.props.race.commentError || false}
                            />
                            {comments.map(comment => <CommentItem comment={comment}/>)}
                                {/* comments */}

                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            );
        }
        else {
            return <div>Loading...</div>
        }   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRace: (id) => dispatch(getRace(id)),
        getComments: (id) => dispatch(getComments(id)),
        rateRace: (rateObj) => dispatch(rateRace(rateObj)),
        submitComment: (commentObj) => dispatch(submitComment(commentObj))
    }
} 

const mapStateToProps = (state) => {
    return {
        race: state.race
    }
} 

RaceDetails = withRouter(RaceDetails);
export default connect(mapStateToProps, mapDispatchToProps)(RaceDetails);
