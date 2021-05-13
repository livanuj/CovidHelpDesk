class Api::V1::RequestsController < ApplicationController
  def index
    requests =
      if params[:request_type] == 'all'
        Request.all
      else 
        Request.where(request_type: params[:request_type])
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
      message = 'Cannot'
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
end