class Request < ApplicationRecord
  enum gender: [:male, :female, :other]
  enum request_type: { Bed: 0, Oxygen: 1, Ventilator: 2, PCR: 3, Doctor: 4 }
  enum urgency: { NORMAL: 0, MODERATE: 1, URGENT: 2 }
  enum status: { active: 0, approved: 1 }

  belongs_to :offer_request, optional: true
  has_one :helper, through: :offer_request

  validates :name, presence: true
  validates :phone, presence: true
  validates :address, presence: true
  validates :urgency, presence: true

  default_scope { order(created_at: :asc) }

  def as_json(options={})
    super({
      only: [:id, :request_type, :urgency, :address, :name, :no_of_requirements, :created_at]
    }.merge(options))
  end

end
