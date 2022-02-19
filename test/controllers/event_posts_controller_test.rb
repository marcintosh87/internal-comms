require "test_helper"

class EventPostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event_post = event_posts(:one)
  end

  test "should get index" do
    get event_posts_url, as: :json
    assert_response :success
  end

  test "should create event_post" do
    assert_difference('EventPost.count') do
      post event_posts_url, params: { event_post: { User_id: @event_post.User_id, all_day: @event_post.all_day, claps: @event_post.claps, clicks: @event_post.clicks, content: @event_post.content, event_date: @event_post.event_date, event_location: @event_post.event_location, event_time: @event_post.event_time, target: @event_post.target, title: @event_post.title, topic: @event_post.topic } }, as: :json
    end

    assert_response 201
  end

  test "should show event_post" do
    get event_post_url(@event_post), as: :json
    assert_response :success
  end

  test "should update event_post" do
    patch event_post_url(@event_post), params: { event_post: { User_id: @event_post.User_id, all_day: @event_post.all_day, claps: @event_post.claps, clicks: @event_post.clicks, content: @event_post.content, event_date: @event_post.event_date, event_location: @event_post.event_location, event_time: @event_post.event_time, target: @event_post.target, title: @event_post.title, topic: @event_post.topic } }, as: :json
    assert_response 200
  end

  test "should destroy event_post" do
    assert_difference('EventPost.count', -1) do
      delete event_post_url(@event_post), as: :json
    end

    assert_response 204
  end
end
