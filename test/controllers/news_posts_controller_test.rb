require "test_helper"

class NewsPostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @news_post = news_posts(:one)
  end

  test "should get index" do
    get news_posts_url, as: :json
    assert_response :success
  end

  test "should create news_post" do
    assert_difference('NewsPost.count') do
      post news_posts_url, params: { news_post: { User_id: @news_post.User_id, claps: @news_post.claps, clicks: @news_post.clicks, content: @news_post.content, target: @news_post.target, title: @news_post.title, topic: @news_post.topic } }, as: :json
    end

    assert_response 201
  end

  test "should show news_post" do
    get news_post_url(@news_post), as: :json
    assert_response :success
  end

  test "should update news_post" do
    patch news_post_url(@news_post), params: { news_post: { User_id: @news_post.User_id, claps: @news_post.claps, clicks: @news_post.clicks, content: @news_post.content, target: @news_post.target, title: @news_post.title, topic: @news_post.topic } }, as: :json
    assert_response 200
  end

  test "should destroy news_post" do
    assert_difference('NewsPost.count', -1) do
      delete news_post_url(@news_post), as: :json
    end

    assert_response 204
  end
end
