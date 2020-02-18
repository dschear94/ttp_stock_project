class Transaction < ApplicationRecord
    validates :user_id, :stock_id, :quantity, :price, presence: true
    validates :order_type, inclusion: { in: [true, false] }

    belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :stock,
    primary_key: :id,
    foreign_key: :stock_id,
    class_name: :Stock
end
