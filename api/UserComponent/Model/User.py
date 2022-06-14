class User:
    userObject = {
        'name': '',
        'phoneNumber': '',
        'email': '',
        'password': '',
        'online': 0
    }

    def __init__(self, body):
        self.userObject = body
