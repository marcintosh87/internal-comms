class EventPostSerializer < ActiveModel::Serializer
  require 'date_format'
  include Rails.application.routes.url_helpers
  attributes :id, :title, :content,:image, :date_of_event, :time, :claps, :clicks, :topic, :all_day, :event_location, :target

 
  has_one :user
  has_many :event_comments
  
  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end

  def date_of_event
    # this is using the gem: gem 'date_format' for the code below to work add it to your gem file and bundle...make sure to put require up top this serializer
    # https://github.com/rpatil/date_format
    today_time = self.object.event_date
    return DateFormat.change_to(today_time, "LONG_DATE")  
  end

  def time
    today_time = self.object.event_time
    return DateFormat.change_to(today_time, "LONG_TIME")  
    
    
  end

  # def mail_time
  #   return self.object.event_time.to_formatted_s(:time)
  # end
end
