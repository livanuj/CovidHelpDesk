class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.string :name
      t.integer :age
      t.string :phone
      t.integer :gender
      t.integer :urgency
      t.integer :request_type
      t.string :address
      t.integer :no_of_requirements
      t.timestamps
    end
  end
end
