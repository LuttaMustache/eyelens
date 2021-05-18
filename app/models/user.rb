class User < ApplicationRecord
    has_secure_password
    validates :password, length: { in: 6..20 }
    validates :username, length: { in: 6..20 }, uniqueness: true
    validates :nickname, length: { in: 1..50 }, uniqueness: true

    has_many :story
end
