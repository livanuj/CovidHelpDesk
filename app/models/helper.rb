class Helper < ApplicationRecord

  has_many :offer_requests
  has_many :requests, through: :offer_requests
end
