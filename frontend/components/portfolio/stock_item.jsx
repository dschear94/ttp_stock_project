import React from "react";

class StockItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    
    componentDidMount() {
        this.props.checkPrice(this.props.ticker);
    }
    
    render() {
        const { checkPrice, ticker, quantity, stockInfo } = this.props;

        const prevPrice = stockInfo[ticker] !== undefined ? stockInfo[ticker].previousClose.toFixed(2) : null;
        const latestPrice = stockInfo[ticker] !== undefined ? stockInfo[ticker].latestPrice.toFixed(2) : null;

        const prevValue = (prevPrice * quantity).toFixed(2);
        const latestValue = (latestPrice * quantity).toFixed(2);

        return (
            <div>
                <h2>{ticker}</h2>
                <div>{quantity} shares</div>
                <div>yesterday's close price: ${prevPrice} </div>
                <div>yesterday's close value: ${prevValue} </div>
                <div>latest price: ${latestPrice} </div>
                <div>latest value: ${latestValue} </div>
            </div>
        )
    }
}

export default StockItem;