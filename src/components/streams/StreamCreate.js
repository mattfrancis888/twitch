import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

//reduxForm acts like connect()

class StreamCreate extends React.Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            //Touched (for input) will be false at first
            //When clicked and then clicked otuside of the input, it will be true
            return <div className="errorText">{error}</div>;
        }
    };

    renderInput = ({ input, label, meta }) => {
        //"component" automatically passes props to argument, it has {input properties and meta properties}
        //"label" automatically passes props to arguments
        return (
            <div>
                <label>{label}</label>
                <input className="createInputs" {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
        //{..input} is shortcut for redux-form; where you take all the input from "component's" props and pass it as
        //props to <input>
    };

    onSubmit = (formValues) => {
        //event.preventDefault()
        //Redux automaticlaly calls it with handleSubmit
        //form values are the values from the fields that redux-form automatiacally passes
        //after clicking the submit button
        this.props.createStream(formValues);
    };
    render() {
        return (
            <React.Fragment>
                <div className="createTitle">Create Stream</div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <div className="createFormSection">
                        <h1> Enter Title </h1>
                        <Field name="title" component={this.renderInput} />
                    </div>
                    <div className="createFormSection">
                        <h1> Enter Description</h1>
                        <Field
                            name="description"
                            component={this.renderInput}
                        />
                    </div>
                    <button className="blueBottom">Submit</button>
                </form>
            </React.Fragment>
        );
    }
}

const validate = (formValues) => {
    //MUST BE NAMED VALIDATE! Other names would be ignored by reduxForm(..)
    const errors = {};
    //If you return an empty object, redux form will assume everything is ok
    if (!formValues.title) {
        //user did not enter title, so undefined
        errors.title = "You must enter a title";
        //Must be the same name as field name! The "error" property in {meta} would receive thi
    }

    if (!formValues.description) {
        errors.description = "You must enter a descritpion";
    }
    return errors;
    //Erors is going to be passed to renderInput's meta
};

const formWrapped = reduxForm({
    form: "streamCreate",
    validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
