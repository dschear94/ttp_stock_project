class Api::TransactionsController < ApplicationController

  def index
    @transactions = Transaction.all
  end

  def show
  end

  def edit
  end

  def create
    @transaction = Transaction.new(transaction_params)

    if @transaction.save
    else
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
          :price
        )
    end

end
