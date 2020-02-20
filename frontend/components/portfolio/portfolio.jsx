import React from "react";
import StockItem from './stock_item';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            ticker: "",
            currentPrice: "$0.00",
            balance: this.props.balance,
            quantity: 0,
            time: null,
            errors: this.props.errors
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceCheck = this.handlePriceCheck.bind(this);
    }

    componentDidUpdate(prevProps) {
        debugger
        if (this.props.latestPrice !== prevProps.latestPrice) {
            this.setState({ 
                currentPrice: this.props.latestPrice.toFixed(2),
                time: Date.now()
            })
        }

    }

    componentWillUnmount() {
        this.props.clearPrices();
    }

    handleSubmit(e) {
        e.preventDefault()

        let date = new Date().toLocaleDateString();
        date = date.split("/");
        let year = date.pop();
        date.unshift(year);
        date = date.join("-");

        if (this.state.balance > (this.state.quantity * this.state.currentPrice)) {
            this.props.processForm({
                user_id: this.state.userId,
                stock_id: this.state.ticker.toUpperCase(),
                quantity: this.state.quantity,
                price: this.state.currentPrice,
                transaction_time: date
            }).then(this.props.getUpdatedUser());
        } else {
            this.setState({ errors: "not enough funds!" })
        }
    }

    handlePriceCheck(e) {
        e.preventDefault()
        this.props.checkPrice(this.state.ticker);
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )
    }

    render() {
        let errors;

        let portfolio = {};

        this.props.transactions.forEach(transaction => {
            let ticker = transaction.stock_id;
            let quantity = parseInt(transaction.quantity);
            if (ticker in portfolio) {
                portfolio[ticker] += quantity;
            } else {
                portfolio[ticker] = quantity;
            }
        })

        const tickers = Object.keys(portfolio);
        // console.log(tickers);

        const stockInfo = tickers.map(ticker => {
        return (<StockItem
            key={ticker}
            ticker={ticker}
            quantity={portfolio[ticker]}
            checkPrice={this.props.checkPrice}
        />)}
        );

        const { currentPrice, quantity } = this.state;

        if (this.state.errors) {
            errors = (
                <h3 className='stock-submit-errors'> ERROR!  {this.state.errors}</h3>
            )
        } else {
            errors = null
        }

        return (

            <div className='stock-submit-page'>
                <div>
                    <h1>Portfolio</h1>
                    <div className='portfolio-container'>
                        {stockInfo}
                    </div>
                </div>
                <main className='stock-submit-form-container'>
                    <form onSubmit={this.handleSubmit} className='stock-submit-form'>

                        <h1 className='stock-submit-heading'>Buy Stocks</h1>

                        <label className='stock-submit-label'>
                            <div className='label-text'>Ticker</div>
                            <input className='input' type="text" value={this.state.ticker} onChange={this.update("ticker")} required />
                        </label>
                        <div className='stock-submit-buttons'>
                            <input className="stock-submit-button" type="submit" value="Check Price" onClick={this.handlePriceCheck}/>
                        </div>
                        Price: {currentPrice}
                        <label className='stock-submit-label'>
                            <div className='label-text'>Quantity</div>
                            <input className="input" type="number" min="0" step="1" value={this.state.quantity} onChange={this.update("quantity")} required />
                        </label>
                        Projected Cost: ${
                            isNaN(currentPrice * quantity) ? "0.00" :
                            (currentPrice * quantity).toFixed(2)
                        }
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