class NewsCommentsController < ApplicationController

    def index
        comment = NewsComment.all
        render json: comment
        
    end

    def create
        comment = NewsComment.create(comment_params)
        render json: comment
    end

    def show
        comment =NewsComment.find_by(id:params[:id])
        
        render json: comment
    end
    
    
    private

    def comment_params
    params.permit(:user_id, :comment, :news_post_id)        
    end
end
