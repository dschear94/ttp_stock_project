class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :quantity, null: false
      t.integer :stock_id, null: false
      t.integer :user_id, null: false
      t.decimal :price, null: false
      t.string :transaction_time

      t.timestamps
    end
    add_index :transactions, :user_id
    add_index :transactions, :stock_id
  end
end
