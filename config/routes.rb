Rails.application.routes.draw do
  get '/home', to: 'home#index'
  get '/maps', to: 'maps#search'
  post '/maps', to: 'maps#search'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
