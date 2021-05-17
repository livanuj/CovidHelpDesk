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
      message = "Request Registered Successfully and is added to the Queue."
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
    @offer_request = OfferRequest.new(offer_request_params)
    @helper = Helper.find_or_initialize_by(phone: helper_params[:phone])

    if has_duplicate_offer_request?
      success = false
      status  = 422
      message = 'You already have help offer waiting for approval for this request.'
    elsif associate_help_requests
      success = true
      status  = 200
      message = 'Help Offer Registered Successfully'
    else
      success = false
      status  = 422
      message = 'Error Reginstering Help Offer'
    end

    render json: {
      success: success,
      message: message
    }, status: status
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

  def has_duplicate_offer_request?
    return false unless @helper.persisted? 

    @helper.offer_requests.pending.select do |offer_request|
      offer_request.requests.ids.sort == help_requests.ids.sort
    end.present?
  end

  def associate_help_requests
    # offer_request = OfferRequest.new(additional_info: offer_request_params)
    # helper = Helper.find_or_initialize_by(phone: helper_params[:phone])

    # if helper.persisted? && helper.requests.ids.sort == help_requests.ids.sort
    #   return false
    # end

    if @helper.update(helper_params)
      @offer_request.helper_id = @helper.id
      @offer_request.requests << help_requests
      @offer_request.save
    end
  end
end