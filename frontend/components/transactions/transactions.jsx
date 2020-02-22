import React from "react";

class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        const { transactions } = this.props;

        const transactionList = transactions.map(transaction => 
            <div key={transaction.id}
            className="transaction-item">
                BUY {transaction.quantity} share{transaction.quantity === 1 ? null : "s"} of {transaction.stock_id} @ ${transaction.price} on {transaction.transaction_time}
            </div>
        );

        return (
            <div className="transactions-container">
                <h1 className="transactions-header">Transactions</h1>
                {transactionList}
            </div>
        )
    }

}

export default Transactions;