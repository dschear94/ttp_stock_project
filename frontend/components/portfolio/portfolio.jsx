import React from "react";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            ticker: "",
            quantity: 0
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.processForm(this.state)
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )

    }

    render() {
        let errors;
        if (this.props.errors.length !== 0) {
            errors = (
                <h3 className='stock-submit-errors'> ERROR!  {this.props.errors}</h3>
            )
        } else {
            errors = null
        }

        return (

            <div className='stock-submit-page'>
                <main className='stock-submit-form-container'>
                    <form onSubmit={this.handleSubmit} className='stock-submit-form'>

                        <h1 className='stock-submit-heading'>Buy Stocks</h1>

                        <label className='stock-submit-label'>
                            <div className='label-text'>Ticker</div>
                            <input className='input' type="text" value={this.state.ticker} onChange={this.update("ticker")} required />
                        </label>
                        <label className='stock-submit-label'>
                            <div className='label-text'>Quantity</div>
                            <input className="input" type="number" min="0" step="1" value={this.state.quantity} onChange={this.update("quantity")} required />
                        </label>
                        {errors}
                        <div className='stock-submit-buttons'>
                            <input className="stock-submit-button" type="submit" value="Submit" />
                        </div>
                    </form>
                </main>
            </div>

        )
    }

}

export default Portfolio;