class Lost:
    lostObject = {
        'lostItem': {},
        'lostUser': {}
    }

    def __init__(self, body):
        self.lostObject = body
