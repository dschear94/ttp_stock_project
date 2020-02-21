import React from "react";

class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { transactions } = this.props;

        console.log(transactions)

        const transactionList = transactions.map(transaction => 
            <div key={transaction.id}>
                BUY {transaction.quantity} share{transaction.quantity === 1 ? null : "s"} of {transaction.stock_id} @ ${transaction.price} on {transaction.transaction_time}
            </div>
        );

        return (
            <div>
                <h1>Transactions</h1>
                {transactionList}
            </div>
        )
    }

}

export default Transactions;