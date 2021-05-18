class Story < ApplicationRecord
    validates :title, length: { in: 1..50 }, uniqueness: true
    validates :synopsis, length: { in: 1..1000 }

    belongs_to :user
    has_many :chapters, -> { order(order: :desc) }
end
