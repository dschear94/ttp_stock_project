import React from "react";

class StockItem extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.props.checkPrice(this.props.ticker);
    }

    render() {
        const { checkPrice, ticker, quantity } = this.props;
        return (
            <div>
                <h2>{ticker}</h2>
                <div>{quantity}</div>
            </div>
        )
    }
}

export default StockItem;