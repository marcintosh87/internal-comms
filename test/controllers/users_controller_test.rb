require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get users_url, as: :json
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post users_url, params: { user: { active: @user.active, admin: @user.admin, department_id: @user.department_id, email: @user.email, extension: @user.extension, first_name: @user.first_name, hire_date: @user.hire_date, last_name: @user.last_name, organization_id: @user.organization_id, owner: @user.owner, password: @user.password, password_digest: @user.password_digest, phone: @user.phone, position: @user.position } }, as: :json
    end

    assert_response 201
  end

  test "should show user" do
    get user_url(@user), as: :json
    assert_response :success
  end

  test "should update user" do
    patch user_url(@user), params: { user: { active: @user.active, admin: @user.admin, department_id: @user.department_id, email: @user.email, extension: @user.extension, first_name: @user.first_name, hire_date: @user.hire_date, last_name: @user.last_name, organization_id: @user.organization_id, owner: @user.owner, password: @user.password, password_digest: @user.password_digest, phone: @user.phone, position: @user.position } }, as: :json
    assert_response 200
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete user_url(@user), as: :json
    end

    assert_response 204
  end
end
