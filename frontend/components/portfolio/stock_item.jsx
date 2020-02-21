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

        return (
            <div>
                <h2>{ticker}</h2>
                <div>{quantity} shares</div>
                <div>{prevPrice} yesterday's close price</div>
                <div>{quantity * prevPrice} yesterday's close value</div>
                <div>{latestPrice} latest price</div>
                <div>{quantity * latestPrice} latest value</div>
            </div>
        )
    }
}

export default StockItem;