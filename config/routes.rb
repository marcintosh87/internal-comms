Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

 
    resources :news_comments
  resources :event_comments
  resources :event_posts
  resources :news_posts
  resources :users
  resources :departments
  resources :organizations

    get "/me", to: "users#show"
    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
 

# this will allow for the deployment to us react
get '*path',
to: 'fallback#index',
constraints: ->(req) { !req.xhr? && req.format.html? }
end
