class OfferRequest < ApplicationRecord
  enum status: { pending: 0, approved: 1 }

  belongs_to :helper
  has_many :requests

end
