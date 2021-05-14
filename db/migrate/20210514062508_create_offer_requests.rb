class CreateOfferRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :offer_requests do |t|
      t.references :helper
      t.text :additional_info

      t.timestamps
    end
  end
end
