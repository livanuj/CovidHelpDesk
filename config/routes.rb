Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  root 'requests#home'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :requests, only: [:index, :create] do
        collection do
          post 'help_request'
        end
      end
    end
  end
end
