class AddStatusInRequestsAndOferRequests < ActiveRecord::Migration[6.1]
  def change
    add_column :requests, :status, :integer
    add_column :offer_requests, :status, :integer
    change_column_default :requests, :status, from: nil, to: 0
    change_column_default :offer_requests, :status, from: nil, to: 0
  end

  def data
    Request.update_all(status: 0)
    OfferRequest.update_all(status: 0)
  end
end
