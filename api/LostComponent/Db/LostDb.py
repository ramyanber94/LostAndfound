import pymongo
from dbConfig import generateMongoClient
from UserComponent.Controller.UserController import UserController
from LostComponent.Model.Lost import Lost

mydb = generateMongoClient()


class LostDb:

    def insertLost(self):
        mycol = mydb["Lost"]
        Lost.lostObject['lostItem'] = self
        id = Lost.lostObject['lostItem']["id"][1:-1]
        Lost.lostObject['lostItem'].pop("id")
        result = UserController.controlGetUserById(id)
        if result != "failed":
            Lost.lostObject['lostUser'] = {
                **result,
                'id': id
            }
        try:
            mycol.insert_one({'data': Lost.lostObject}).inserted_id
            return True
        except pymongo.errors.OperationFailure as e:
            return False

    def getLost(self):
        mycol = mydb["Lost"]
        x = mycol.find()
        arrayOfLosts = []
        for data in x:
            if data:
                arrayOfLosts.append(data)
            else:
                return False
        return arrayOfLosts
