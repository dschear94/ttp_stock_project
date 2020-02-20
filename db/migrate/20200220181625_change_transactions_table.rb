class ChangeTransactionsTable < ActiveRecord::Migration[5.2]
  def change
    change_column :transactions, :stock_id, :string
  end
end
