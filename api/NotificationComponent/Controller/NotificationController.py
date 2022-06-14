from NotificationComponent.DB.NotificationDb import checkUserInMatches


def getMatchesForOnlineUsers():
    object = checkUserInMatches()
    if len(object) > 0:
        return object
    else:
        return None
