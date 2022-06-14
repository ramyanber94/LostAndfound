import imp
import pymongo
from dbConfig import generateMongoClient
from UserComponent.Controller.UserController import UserController
from FoundComponent.Model.Found import Found

mydb = generateMongoClient()


class FoundDb:

    def insertFound(self):
        mycol = mydb["Found"]
        Found.foundObject['foundItem'] = self
        id = Found.foundObject['foundItem']["id"][1:-1]
        Found.foundObject['foundItem'].pop("id")
        result = UserController.controlGetUserById(id)
        if result != "failed":
            Found.foundObject['foundHero'] = {
                **result,
                'id': id
            }
        try:
            mycol.insert_one({'data': Found.foundObject}).inserted_id
            return True
        except pymongo.errors.OperationFailure as e:
            return False

    def getFound(self):
        mycol = mydb["Lost"]
        x = mycol.find()
        arrayOfFounds = []
        for data in x:
            if data:
                arrayOfFounds.append(data)
            else:
                return False
        return arrayOfFounds
