import React from "react";
import StockItem from './stock_item';
import TransactionForm from './transaction_form';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.handlePriceCheck = this.handlePriceCheck.bind(this);
    }

    componentDidMount() {

        // iterate through user's transactions to determine stock holdings

        let portfolio = {};

        this.props.transactions.forEach(transaction => {
            let ticker = transaction.stock_id;
            let quantity = parseInt(transaction.quantity);
            if (ticker in portfolio) {
                portfolio[ticker] += quantity;
            } else {
                portfolio[ticker] = quantity;
            }
        });


        // get prices from iexAPI
        
        this.props.checkPrices(Object.keys(portfolio))

    }

    componentDidUpdate(prevProps) {

        if (this.props.transactions.length !== prevProps.transactions.length) {

            // iterate through user's transactions to determine stock holdings

            let portfolio = {};

            this.props.transactions.forEach(transaction => {
                let ticker = transaction.stock_id;
                let quantity = parseInt(transaction.quantity);
                if (ticker in portfolio) {
                    portfolio[ticker] += quantity;
                } else {
                    portfolio[ticker] = quantity;
                }
            });


            // get prices from iexAPI

            this.props.checkPrices(Object.keys(portfolio))
        }
    }

    componentWillUnmount() {
        this.props.clearPrices();
    }

    handlePriceCheck(e) {
        e.preventDefault()
        this.props.checkPrices(this.state.ticker)
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )
    }

    render() {

        // destructure vars from props and state for ease of use

        const { stockInfo, checkPrice, latestPrice, checkPrices, clearPrices, clearPrice, clearErrors, balance, processForm, userId, errors } = this.props;

        
        // iterate through user's transactions to determine stock holdings

        let portfolio = {};
        
        this.props.transactions.forEach(transaction => {
            let ticker = transaction.stock_id;
            let quantity = parseInt(transaction.quantity);
            if (ticker in portfolio) {
                portfolio[ticker] += quantity;
            } else {
                portfolio[ticker] = quantity;
            }
        });


        // iterate through holdings to feed individual stock item components

        const tickers = Object.keys(portfolio);

        const portfolioItems = tickers.map(ticker => <StockItem
            key={ticker}
            ticker={ticker}
            quantity={portfolio[ticker]}
            stockInfo={stockInfo}
            checkPrices={checkPrices}/>
        );


        // calculate portfolioValue

        let portfolioValue = 0;

        tickers.forEach(ticker => {
            let quantity = portfolio[ticker];
            stockInfo[ticker] !== undefined ? 
                portfolioValue += parseFloat((quantity * (stockInfo[ticker].latestPrice).toFixed(2)))
            : 0;
        })

        return (

                <div className="portfolio-page">

                    <div className='portfolio-container'>
                        <h1 className="portfolio-header">Portfolio (${portfolioValue.toFixed(2)})</h1>
                        <br/>
                        {portfolioItems}
                    </div>

                    <TransactionForm 
                    balance={balance} 
                    stockInfo={stockInfo} 
                    checkPrice={checkPrice}
                    clearPrices={clearPrices} 
                    clearPrice={clearPrice} 
                    processForm={processForm}
                    latestPrice={latestPrice}
                    userId={userId}
                    errors={errors}
                    clearErrors={clearErrors}/>

                </div>
        )
    }

}

export default Portfolio;