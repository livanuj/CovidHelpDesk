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
    }
  end

  def create
  end
end