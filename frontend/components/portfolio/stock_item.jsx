import React from "react";

class StockItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { ticker, quantity, stockInfo } = this.props;

        const prevPrice = stockInfo[ticker] !== undefined ? stockInfo[ticker].previousClose.toFixed(2) : null;
        const latestPrice = stockInfo[ticker] !== undefined ? stockInfo[ticker].latestPrice.toFixed(2) : null;
        const name = stockInfo[ticker] !== undefined ? stockInfo[ticker].companyName : null;


        const latestValue = (latestPrice * quantity).toFixed(2);

        return (
            <div style={{color: latestPrice > prevPrice ? "green" : "red"}}>
                <h2>{ticker} ({name}) - {quantity} share{quantity === 1 ? null : "s"} ${latestValue}</h2>
            </div>
        )
    }
}

export default StockItem;