class DepartmentsController < ApplicationController
    def index
        dep = Department.all
        
        render json: dep
    end
    
end
