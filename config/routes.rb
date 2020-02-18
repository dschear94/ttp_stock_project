Rails.application.routes.draw do
  resources :transactions
  resources :stocks
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
end
