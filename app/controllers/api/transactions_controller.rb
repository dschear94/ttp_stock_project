class Api::TransactionsController < ApplicationController

  def index
    @transactions = Transaction.all
  end

  def show
  end

  def edit
  end

  def create
    @stock = Stock.find_by(ticker: params["transaction"]["stock_id"]) || Stock.create!(ticker: params["transaction"]["stock_id"])
    @transaction = Transaction.new(transaction_params)


    if @transaction.save
      new_balance = current_user.balance - (@transaction.price * @transaction.quantity).round(2)
      current_user.update_attributes(balance: new_balance)
      render "/api/transactions/show"
    else
      render json: ["Invalid transaction"], status: 406

    end

  end

  def update

  end

  def destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def transaction_params
        params.require(:transaction).permit(
          :user_id, 
          :stock_id, 
          :quantity, 
          :price,
          :transaction_time
        )
    end

end
