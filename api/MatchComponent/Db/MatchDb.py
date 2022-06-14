from dbConfig import generateMongoClient
import json
import pymongo
from MatchComponent.Model.Match import Match

mydb = generateMongoClient()


def getMatches():
    mycol = mydb["Lost"]

    task = mycol.aggregate([

        {
            '$lookup':
            {
                'from': 'Found',
                'let': {'bankCard': '$data.lostItem.bankCardNo', 'nationalCard': '$data.lostItem.nationalCardNo'},
                'pipeline': [
                    {'$match':
                     {'$expr':
                      {'$or':
                       [
                           {'$eq': ["$data.foundItem.bankCardId",  "$$bankCard"]},
                           {'$eq': ["$data.foundItem.nationalCardId",
                                    "$$nationalCard"]}
                       ]
                       }
                      },
                     },
                ],
                'as': "match"
            }
        },
        {
            '$unwind': '$match'
        },
    ])

    for doc in task:
        lostItem = doc['data']['lostItem']
        foundItem = doc['match']['data']['foundItem']
        item = []
        if lostItem['nationalCardNo'] == foundItem['nationalCardId']:
            item.append('National Card')
        if lostItem['bankCardNo'] == foundItem['bankCardId']:
            item.append('Bank Card')
        Match.matchObject = {
            'foundHero': doc['match']['data']['foundHero'],
            'item': item,
            'lostUser': doc['data']['lostUser']
        }
        insertMatches(Match.matchObject)


def insertMatches(match):
    mycol = mydb["Match"]
    try:
        mycol.find_one_and_update({
            'query': {'data.foundHero.id': match['foundHero']['id'], 'data.lostUser.id': match['lostUser']['id']}},
            {"$set": {"data": match}},
            upsert=True)
    except pymongo.errors.OperationFailure as e:
        print(e)
