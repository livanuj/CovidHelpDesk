class Api::V1::RequestsController < ApplicationController
  before_action :help_requests, only: :help_request

  def index
    requests =
      if params[:request_type] == 'all'
        Request.active
      else 
        Request.active.where(request_type: params[:request_type])
      end

    render json: {
      success: true,
      data: requests.as_json
    }, status: 200
  end

  def create
    new_request = Request.new(request_params)

    if new_request.save
      status = 200
      success = true
      message = "Request Registered Successfully!"
    else
      status = 422
      success = false
      message = new_request.errors.full_messages.join(', ')
    end

    render json: {
      success: success,
      message: message
    }, status: status
  end

  def help_request
    if associate_help_requests
      render json: {
        success: true,
        message: 'Help Offer Registered Successfully'
      }
    else
      render json: {
        success: false,
        message: 'Error Reginstering Help Offer'
      }
    end

  end

  private

  def request_params
    params.require(:request).permit(:request_type, :name, :age, :address, :phone, :gender, :urgency, :no_of_requirements, :additional_info)
  end

  def helper_params
    params.require(:helper).permit(:name, :address, :phone)
  end

  def offer_request_params
    params.require(:helper).permit(:additional_info)
  end

  def help_requests
    Request.where(id: params[:request_ids])
  end

  def associate_help_requests
    offer_request = OfferRequest.new(additional_info: offer_request_params)
    helper = Helper.find_or_initialize_by(phone: helper_params[:phone])

    if helper.update(helper_params)
      offer_request.helper_id = helper.id
      offer_request.requests << help_requests
      offer_request.save
    end
  end
end