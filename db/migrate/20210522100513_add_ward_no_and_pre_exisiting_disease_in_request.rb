class AddWardNoAndPreExisitingDiseaseInRequest < ActiveRecord::Migration[6.1]
  def change
    add_column :requests, :ward_no, :integer
    add_column :requests, :pre_existing_diseases, :text
  end
end
