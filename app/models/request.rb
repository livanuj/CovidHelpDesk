class Request < ApplicationRecord
  enum gender: [:male, :female, :other]
  enum request_type: { bed: 0, oxygen: 1, ventilator: 2, vehicle: 3 }
  enum urgency: { normal: 0, moderate: 1, urgent: 2 }

  validates :name, presence: true
  validates :phone, presence: true
  validates :address, presence: true
  validates :urgency, presence: true
end
