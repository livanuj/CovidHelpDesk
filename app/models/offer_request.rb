class OfferRequest < ApplicationRecord
  belongs_to :helper
  has_many :requests

end
