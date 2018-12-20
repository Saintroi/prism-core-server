from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify
from db import db

app = Flask(__name__)
api = Api(app)
db = db()

class Contact(Resource):
    def get(self):
        db.connect()
        db.cursor.execute("SELECT * FROM contact")
        columns = [i[0] for i in db.cursor.description]
        #result = {'contacts': [i[0] for i in db.cursor.description]}
        result =  {'contacts': [dict(zip(tuple(columns), i)) for i in db.cursor.fetchall()]}
        db.conn.close()
        return jsonify(result)


api.add_resource(Contact, '/contacts')

#if __name__ == '__main__':
 #   app.run(port='5002')