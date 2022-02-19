Rails.application.routes.draw do
  resources :news_comments
  resources :event_comments
  resources :event_posts
  resources :news_posts
  resources :users
  resources :departments
  resources :organizations
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
