class Api::StocksController < ApplicationController

  def index
    @stocks = Stock.all
  end

  def show
  end

  def edit
  end

  def create
    @stock = Stock.new(stock_params)

    if @stock.save
    else
    end

  end

  def update

  end

  def destroy
  end

  private
    # Only allow a list of trusted parameters through.
    def stock_params
    end

end
