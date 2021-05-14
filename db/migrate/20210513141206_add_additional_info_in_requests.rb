class AddAdditionalInfoInRequests < ActiveRecord::Migration[6.1]
  def change
    add_column :requests, :additional_info, :text
    add_reference :requests, :offer_request, index: false
  end
end
