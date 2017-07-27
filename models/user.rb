class User < ActiveRecord::Base
  has_many :task_lists, dependent: :destroy

  def self.from_omniauth(auth)
    user = User.find_by(provider: auth.provider, uid: auth.uid)
    unless user
      user = User.create(
        provider: auth.provider,
        uid: auth.uid,
        name: auth.info.name
      )
      user.task_lists.create(title: 'TODO list')
    end
    user
  end
end
