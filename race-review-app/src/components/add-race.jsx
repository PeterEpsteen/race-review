import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { getRaceParams, submitRace } from '../actions/index'
import './add-race.css'
import {statesArray} from '../utilities/states';

class AddRace extends Component {
    componentWillMount() {
        this.props.dispatch(getRaceParams());
    }

    handleSubmit({name, bikeType, raceType, city, state, organizer}) {
        this.props.submitRace({
            race: {
                name: name,
                bikeType: bikeType,
                raceType: raceType,
                location: {
                    state: state,
                    city: city
                },
                organizer: organizer
            }
        });
    }
    render() {
        console.log(this.props.params);
        const { handleSubmit, submitting, pristine, invalid } = this.props;
        
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
            <div className="form">
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
                    <Field name={renderField} component="select">
                        {raceTypes}
                    </Field>
                </fieldset>
                <fieldset>
                    <label>Location</label>
                    <Field name="city" 
                        placeholder="City"
                        component={renderField}/>
                    <label htmlFor="state">State</label>
                     <Field name="state" 
                        placeholder="State"
                        component="select">
                        {statesArray.map(state => <option key={state} value={state}>{state}</option>)}
                        </Field>
                </fieldset>
                <fieldset>
                    <label>Organizer (optional)</label>
                    <Field name="organizer" component={renderField}/>
                </fieldset>
                <button disabled={submitting || invalid || pristine} type="submit">Save</button>
            </form>
            </div>
            </div>
        
        );
    }
}

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = 'Required'
    }
    else if (values.name.length < 8) {
        errors.name = "Please enter a name that is at least 8 characters long"
    }
    else if (values.name.length > 60) {
        errors.name = "Please enter a shorter name. (60 characters or less)"
    }
    if (!values.city) {
        errors.city = 'Required'
    }
    return errors;
}

const mapDispatchToProps = dispatch => {
    return {
        submitRace: (race) => dispatch(submitRace(race))
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
    meta: {touched, active, error, warning}
}) => (
    <div className="input-group">
        <input {...input} type={type} placeholder = {placeholder}/>
        <p> {touched && !active && ((error && <span>{error}</span>))}</p>
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