class User < ActiveRecord::Base
  has_many :task_lists

  def self.from_omniauth(auth)
    user = User.where(provider: auth.provider, uid: auth.uid).take
    if user.nil?
      user = User.create(provider: auth.provider,
                         uid:      auth.uid,
                         name:      auth.info.name)
      TaskList.create(title: 'TODO list', user_id: user.id)
    end

    user
  end
end
