class EventPostsController < ApplicationController
  before_action :set_event_post, only: [:show, :update, :destroy]

  # GET /event_posts
  def index
    @event_posts = EventPost.all.order(created_at: :desc)

    render json: @event_posts
  end

  # GET /event_posts/1
  def show
    render json: @event_post
  end

  # POST /event_posts
  def create
    post = EventPost.create(event_post_params)
   render json: post
  end

  # PATCH/PUT /event_posts/1
  def update
    if @event_post.update(event_post_params)
      render json: @event_post
    else
      render json: @event_post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /event_posts/1
  def destroy
    @event_post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event_post
      @event_post = EventPost.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def event_post_params
      params.permit(:title, :content, :claps, :clicks, :user_id, :topic, :event_date, :event_time, :all_day, :event_location, :target, :image)
    end
end
