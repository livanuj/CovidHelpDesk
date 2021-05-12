class Api::V1::RequestsController < ApplicationController
  def index
    requests = Request.all

    render json: {
      success: true,
      data: requests.as_json
    }
  end

  def create
  end
end