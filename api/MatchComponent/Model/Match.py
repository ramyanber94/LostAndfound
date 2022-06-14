class Match:
    matchObject = {
        'foundHero': {},
        'item': {},
        'lostUser': {}
    }

    def __init__(self, body):
        self.matchObject = body
