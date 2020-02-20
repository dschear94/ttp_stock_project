import React from "react";
import { Link } from "react-router-dom";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.processForm(this.state);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleClick() {
        this.props.clearErrors();
    }
    render() {
        let nameError = null;
        let emailError = null;
        let passwordError = null;
        let nameClassError;
        let emailClassError;
        let passwordClassError;
        const errorTitles = [ "Name", "Email", "Password"];

        this.props.errors.forEach(error => {
            let word = error.split(" ")[0];
            if (errorTitles.includes(word)) {
                switch (word) {
                    case "Name":
                        nameClassError = "errored";
                        nameError = (
                            <div className="error-container">
                                <div className="signup-error">
                                    {"Please enter your name."}
                                </div>{" "}
                                <div className="arrow"></div>
                            </div>
                        );
                        return;
                    case "Email":
                        emailClassError = "errored";
                        emailError = (
                            <div className="error-container">
                                <div className="signup-error">
                                    {"Please enter your email address."}
                                </div>{" "}
                                <div className="arrow"></div>
                            </div>
                        );
                        return;
                    case "Password":
                        passwordClassError = "errored";
                        passwordError = (
                            <div className="error-container">
                                <div className="signup-error">
                                    {"Your password must be at least 10 characters."}
                                </div>
                                <div className="arrow"></div>
                            </div>
                        );
                        return;
                }
            }
        });

        return (
            <main className="signup-form-container">
                <form onSubmit={this.handleSubmit} className="signup-form">
                    <div className="signup-header">
                        Signup
                    </div>
                    <div className="signup-component">
                        <label>
                            <input
                                onClick={this.handleClick}
                                className={`signup-input ${nameClassError}`}
                                type="text"
                                value={this.state.name}
                                onChange={this.update("name")}
                                placeholder="name"
                            />
                            {nameError}
                        </label>
                        <label>
                            <input
                                onClick={this.handleClick}
                                className={`signup-input ${emailClassError}`}
                                type="text"
                                value={this.state.email}
                                onChange={this.update("email")}
                                placeholder="Email address"
                            />
                            {emailError}
                        </label>
                        <label>
                            <input
                                onClick={this.handleClick}
                                className={`signup-input ${passwordClassError}`}
                                type="password"
                                value={this.state.password}
                                onChange={this.update("password")}
                                placeholder="Password (min. 10 characters)"
                            />
                            {passwordError}
                        </label>
                        <div className="signup-button-container">
                            <input className="signup-submit" type="submit" value="Sign Up" />
                        </div>
                    </div>
                </form>
            </main>
        );
    }
}

export default SignupForm;