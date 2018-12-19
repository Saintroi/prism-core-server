import mysql.connector
from mysql.connector import Error

class db:

    def __init__(self):
        self.conn = None
        self.cursor = None

    def connect(self):
        """ Connect to Database """
        try:
            self.conn = mysql.connector.connect(host='localhost', database='prismcore',user='drew', password='Took21')

            if self.conn.is_connected():
                print("Connected to Database")
                self.cursor = self.conn.cursor()
                
        except Error as e:
                print(e)                
