import React from "react";
import { withRouter } from 'react-router-dom';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            ticker: "",
            currentPrice: "0.00",
            balance: this.props.balance,
            quantity: 0,
            time: null,
            errors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceCheck = this.handlePriceCheck.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.latestPrice.price.toFixed(2) !== this.state.currentPrice) {
            this.setState({
                currentPrice: this.props.latestPrice.price.toFixed(2),
                time: Date.now()
            })
        }

        if (this.state.errors === "Must request new quote" && 
            this.state.ticker.toUpperCase() === this.props.latestPrice.ticker) {
            this.setState({
                errors: ""
            })
        }

        if (this.state.errors === "Must order 1 or more shares" && 
            parseInt(this.state.quantity) > 0) {
            this.setState({
                errors: ""
            })
        }

    }

    componentWillUnmount() {
        this.props.clearPrice();
    }

    handleSubmit(e) {
        e.preventDefault()

        // check if form ticker matches quoted ticker

        if (this.props.latestPrice.ticker !== this.state.ticker.toUpperCase()) {
            return this.setState({
                errors: "Must request new quote"
            })
        }
        // check if quantity > 0

        if (parseInt(this.state.quantity) === 0) {
            return this.setState({
                errors: "Must order 1 or more shares"
            })
        }

        // create date string

        let date = new Date().toLocaleDateString();
        date = date.split("/");
        let year = date.pop();
        date.unshift(year);
        date = date.join("-");

        
        // send form data to backend, redirect to transactions page upon success

        this.props.processForm({
            user_id: this.props.userId,
            stock_id: this.state.ticker.toUpperCase(),
            quantity: this.state.quantity,
            price: this.state.currentPrice,
            transaction_time: date
        }).then(() => this.props.history.push("/transactions"))

    }

    handlePriceCheck(e) {
        e.preventDefault()
        this.props.checkPrice([this.state.ticker])
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )
    }

    handleClick() {
        this.props.clearErrors();
    }

    render() {

        // handle errors

        let errors;
        this.props.errors.length !== 0 || this.state.errors.length !== 0 ?
            errors = <h3 className='stock-submit-errors'>{this.props.errors}{this.state.errors}</h3>
            : errors = null

        // destructure vars for ease of use

        const { balance } = this.props;
        const { currentPrice, quantity } = this.state;


        return (
                <main className='stock-submit-form-container'>
                    <form onSubmit={this.handleSubmit} className='stock-submit-form'>
                        <h1 className='stock-submit-header'>Buy Stocks</h1>
                        <h2 className='stock-sub-header-2'>CASH - ${balance.toFixed(2)}</h2>
                        <br/>
                        <label className='stock-submit-label'>
                        <span className='stock-submit-text'>Ticker: </span><input className='input' type="text" value={this.state.ticker} onClick={this.handleClick} onChange={this.update("ticker")} required />
                        </label>
                        <br/>
                        <input className="stock-submit-button" type="submit" value="Get Latest Quote" onClick={this.handlePriceCheck} />
                        <br/>
                        <div className="quote">
                            Price: ${currentPrice}
                        </div>
                        <br/>
                        <label className='stock-submit-label'>
                        <span className='stock-submit-text'>Quantity:</span><input className="input" type="number" min="0" step="1" value={this.state.quantity} onClick={this.handleClick} onChange={this.update("quantity")} required />
                        </label>
                        <br/>
                        <div className="cost">
                            Projected Cost: ${
                                isNaN(currentPrice * quantity) ? "0.00" :
                                    (currentPrice * quantity).toFixed(2)
                            }
                        </div>
                        <br/>
                        {errors}
                        <input className="stock-submit-button" type="submit" value="Submit Order" />
                    </form>
                </main>
        )
    }

}

export default withRouter(TransactionForm);