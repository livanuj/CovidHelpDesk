ActiveAdmin.register Request do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :name, :age, :phone, :gender, :urgency, :request_type, :address, :no_of_requirements, :additional_info, :offer_request_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:name, :age, :phone, :gender, :urgency, :request_type, :address, :no_of_requirements, :additional_info, :offer_request_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  includes :helper

  index do
    selectable_column
    column "Id", :id
    column "Request Type", :request_type
    column "Urgency", :urgency
    column "Name", :name
    column "Phone", :phone
    column "Status", :status
    column "Created At", :created_at
    column :helper, sortable: 'helpers.name'
    # column "Offer From" do |request|
    #   next if request.offer_request.nil?
    #   link_to request.helper.name, admin_offer_request_path(request.offer_request)
    # end
    actions
  end
end
