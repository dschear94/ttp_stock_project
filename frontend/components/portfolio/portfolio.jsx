import React from "react";
import StockItem from './stock_item';
import TransactionForm from './transaction_form';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: this.props.errors
        }

        this.handlePriceCheck = this.handlePriceCheck.bind(this);
    }

    componentDidMount() {
        
        const { stockInfo, checkPrices, balance } = this.props;
        const { currentPrice, quantity } = this.state;


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
        
        this.props.checkPrices(Object.keys(portfolio))

    }


    // componentDidUpdate(prevProps) {

    //     let { stockInfo } = this.props;
    //     let { ticker } = this.state;

    //     if (ticker.toUpperCase() in stockInfo) {
    //         if (prevProps.stockInfo[ticker.toUpperCase()] === undefined || stockInfo[ticker.toUpperCase()].latestPrice.toFixed(2) !== this.state.currentPrice) {
    //             this.setState({
    //                 currentPrice: stockInfo[ticker.toUpperCase()].latestPrice.toFixed(2),
    //                 time: Date.now()
    //             })
    //         }
    //     }
    // }

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

        // handle errors

        let errors;
        this.state.errors ? 
        errors = <h3 className='stock-submit-errors'> ERROR!  {this.state.errors}</h3>
        : errors = null


        // destructure vars from props and state for ease of use

        const { stockInfo, checkPrice, latestPrice, checkPrices, clearPrices, balance, processForm, userId } = this.props;
        const { currentPrice, quantity } = this.state;


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
                portfolioValue += parseFloat((quantity * stockInfo[ticker].latestPrice).toFixed(2))
            : 0;
        })

        return (

                <div className="portfolio-page">
                    <h1>Portfolio (${portfolioValue.toFixed(2)})</h1>

                    <div className='portfolio-container'>
                        {portfolioItems}
                    </div>

                    <TransactionForm 
                    balance={balance} 
                    stockInfo={stockInfo} 
                    checkPrice={checkPrice}
                    clearPrices={clearPrices} 
                    processForm={processForm}
                    latestPrice={latestPrice}
                    userId={userId}/>

                </div>
        )
    }

}

export default Portfolio;