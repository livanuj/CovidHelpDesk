ActiveAdmin.register OfferRequest do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  permit_params :helper_id, :additional_info, :status
  #
  # or
  #
  # permit_params do
  #   permitted = [:helper_id, :additional_info]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  includes :helper
  includes :requests

  index do
    selectable_column
    column :id
    column :requests
    column :helper, sortable: 'helpers.name'
    column :status
    column "Offered Date", :created_at
    actions
  end
  
  show title: 'Offer Requests' do
    h1 'Offerred by'
    h3 link_to offer_request.helper.name, admin_helper_path(offer_request.helper)
    h3 offer_request.helper.phone
    h3 'There are ' + pluralize(offer_request.requests.count, 'request') + ' in this Offer'
    table_for offer_request.requests do
      column :id
      column :name
      column :urgency
      column :request_type
      column :phone
      column :status
      column :created_at
    end
  end

  member_action :approve, method: :post do
    offer_request = OfferRequest.find(params[:id])

    if offer_request.update(status: 'approved')
      offer_request.requests.update_all(status: 'approved')
    end

    flash[:notice] = "Post has been approved"
    redirect_to [:admin, offer_request]
  end

  action_item :publish, only: :show do
    if !offer_request.approved?
      link_to "Approve", approve_admin_offer_request_path(offer_request), method: :post
    end
  end
end
