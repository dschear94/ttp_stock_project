class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true }
    after_initialize :ensure_session_token

    attr_reader :password

    has_many :transactions,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Transaction

    has_many :stocks,
    through: :transactions,
    source: :stock

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username) || User.find_by(email: username)
        return nil unless user && user.is_password?(password)
        user
    end

    def self.find_by_entry(entry)
        user = User.find_by(username: entry) || User.find_by(email: entry)
        return user ? user : nil
    end
  
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    bcrypt_pw = BCrypt::Password.new(self.password_digest)
    bcrypt_pw.is_password?(password)
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end
end