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
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceCheck = this.handlePriceCheck.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.latestPrice.toFixed(2) !== this.state.currentPrice) {
            this.setState({
                currentPrice: this.props.latestPrice.toFixed(2),
                time: Date.now()
            })
        }
    }

    componentWillUnmount() {
        this.props.clearPrice();
    }

    handleSubmit(e) {
        e.preventDefault()

        // create date string

        let date = new Date().toLocaleDateString();
        date = date.split("/");
        let year = date.pop();
        date.unshift(year);
        date = date.join("-");

        
        // send form data to backend

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
        this.props.errors.length !== 0 ?
            errors = <h3 className='stock-submit-errors'>{this.props.errors}</h3>
            : errors = null


        // destructure vars for ease of use

        const { balance } = this.props;
        const { currentPrice, quantity } = this.state;


        return (
                <main className='stock-submit-form-container'>
                    <form onSubmit={this.handleSubmit} className='stock-submit-form'>
                        <h1 className='stock-submit-header'>Buy Stocks</h1>
                        <h2>CASH - ${balance.toFixed(2)}</h2>
                        <label className='stock-submit-label'>
                            <div className='label-text'>Ticker</div>
                            <input className='input' type="text" value={this.state.ticker} onClick={this.handleClick} onChange={this.update("ticker")} required />
                        </label>
                        <div className='stock-submit-buttons'>
                            <input className="stock-submit-button" type="submit" value="Get Latest Quote" onClick={this.handlePriceCheck} />
                        </div>
                        Price: ${currentPrice}
                        <label className='stock-submit-label'>
                            <div className='label-text'>Quantity</div>
                            <input className="input" type="number" min="0" step="1" value={this.state.quantity} onClick={this.handleClick} onChange={this.update("quantity")} required />
                        </label>
                        Projected Cost: ${
                            isNaN(currentPrice * quantity) ? "0.00" :
                                (currentPrice * quantity).toFixed(2)
                        }
                        {errors}
                        <div className='stock-submit-buttons'>
                            <input className="stock-submit-button" type="submit" value="Submit Order" />
                        </div>
                    </form>
                </main>
        )
    }

}

export default withRouter(TransactionForm);