import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getRaceParams, submitRace } from '../actions/index'

class AddRace extends Component {
    componentWillMount() {
        this.props.dispatch(getRaceParams());
    }

    handleSubmit(form) {
        this.props.dispatch(submitRace(form))
    }
    render() {
        console.log(this.props.params);
        const { handleSubmit, submitting } = this.props;
        
        const raceTypes = (this.props.params.raceType) ?
        this.props.params.raceType
        .map(type => <option value={type} key={type}>{type}</option>) : 
        <option name="" id=""></option>;

        const bikeTypes = (this.props.params.bikeType) ?
        this.props.params.bikeType
        .map(type => <option value={type} key={type}>{type}</option>) : 
        <option name="" id=""></option>;

        return (
            <div className="add-race">
            <h1>Add a Race</h1>
                 <form 
                 onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
                <fieldset>
                    <label>Name:</label>
                    <Field type="text" component={renderField} name="name"/>
                </fieldset>
                <fieldset>
                    <label>Bike Type</label>
                    <Field component="select" name="bikeType">
                        {bikeTypes}
                    </Field>
                </fieldset>
                <fieldset>
                    <label>Race Type</label>
                    <Field name="raceType" component="select">
                        {raceTypes}
                    </Field>
                </fieldset>
                <fieldset>
                    <label>Location</label>
                    <Field name="city" 
                        placeholder="City"
                        component="input"/>
                     <Field name="state" 
                        placeholder="State"
                        component="input"/>
                </fieldset>
                <fieldset>
                    <label>Organizer (optional)</label>
                    <Field name="organizer" component="input"/>
                </fieldset>
                <button type="submit">Save</button>
            </form>
            </div>
        
        );
    }
}

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'Required'
    }
    if (!values.city) {
        errors.city = 'Required'
    }
    if (!values.state) {
        errors.state = 'Required'
    }
    return errors;
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    }
}

const mapStateToProps = state => {
    return {
        params: state.params
    }
}

const renderField = ({
    input,
    type,
    placeholder,
    meta: {touched, error, warning}
}) => (
    <div className="input-group">
        <input {...input} type={type} placeholder = {placeholder}/>
        {touched && ((error && <span>{error}</span>))}
    </div>
);

AddRace = connect(mapStateToProps, mapDispatchToProps)(AddRace);
export default reduxForm({
    form: 'addRace',
    initialValues: {
        bikeType: "Mountain",
        raceType: "XC"
    },
    validate
})(AddRace);