class EventCommentsController < ApplicationController

    def index
        comment = EventComment.all
        render json: comment
        
    end

    def create
        comment = EventComment.create(comment_params)
        render json: comment
    end

    def show
        comment =EventComment.find_by(id:params[:id])
        
        render json: comment
    end
    
    
    private

    def comment_params
    params.permit(:user_id, :comment, :event_post_id)        
    end
    
end
