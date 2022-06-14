from dbConfig import generateMongoClient
import json
import pymongo

mydb = generateMongoClient()


def checkUserInMatches():
    notificationObjects = []
    mycol = mydb['User']
    task = mycol.aggregate([
        {
            '$addFields':
            {
                'userId': {'$toString': '$_id'}
            }
        },
        {
            '$lookup':
            {
                'from': 'Match',
                'let':
                {
                    'online': '$data.online',
                    'userId': '$userId'
                },
                'pipeline':
                [
                    {'$match':
                     {'$expr':
                      {'$and':
                       [
                           {'$or':
                            [
                                {
                                    '$eq': ['$data.lostUser.id', "$$userId"]
                                },
                                {
                                    '$eq': ['$data.foundHero.id', "$$userId"]
                                },
                            ]},

                           {
                               '$eq': ["1", "$$online"]
                           }
                       ]
                       }
                      }
                     }
                ],
                'as': "matching"
            }
        }
    ])
    if task:
        for data in task:
            if len(data['matching']) > 0:
                notificationObject = {
                    'user': data['data']
                }
                if data['userId'] == data['matching'][0]['query']['data.foundHero.id']:
                    notificationObject['hero'] = 1
                    notificationObject['Item'] = data['matching'][0]['data']['item']
                    notificationObject['loserContactInfo'] = data['matching'][0]['data']['lostUser']
                if data['userId'] == data['matching'][0]['query']['data.lostUser.id']:
                    notificationObject['loser'] = 1
                    notificationObject['Item'] = data['matching'][0]['data']['item']
                    notificationObject['heroContactInfo'] = data['matching'][0]['data']['foundHero']
                notificationObjects.append(notificationObject)
    return notificationObjects
