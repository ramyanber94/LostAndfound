from UserComponent.Model.User import User
from UserComponent.Db.UserDb import UserDb


class UserController:

    def controlReg(self):
        user = User(self)
        res = UserDb.insertUser(user.userObject)
        if res:
            return res
        else:
            return 'failed'

    def controlLog(self):
        res = UserDb.getUser(self)
        if res:
            return res
        else:
            return 'failed'

    def controlGetUserById(self):
        res = UserDb.getUserById(self)
        if res:
            return res
        else:
            return 'failed'

    def controlOnline(self):
        if self['data']['online']:
            UserDb.updateUser(self['data']['id'], "1")
        else:
            UserDb.updateUser(self['data']['id'], "0")
