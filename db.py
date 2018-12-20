import mysql.connector
import config
from mysql.connector import Error

class db:

    def __init__(self):
        self.conn = None
        self.cursor = None

    def connect(self):
        """ Connect to Database """
        try:
            self.conn = mysql.connector.connect(host=config.DATABASE_CONFIG['host'], 
                        database=config.DATABASE_CONFIG['dbname'],
                        user=config.DATABASE_CONFIG['user'], 
                        password=config.DATABASE_CONFIG['password'])

            if self.conn.is_connected():
                print("Connected to Database")
                self.cursor = self.conn.cursor()
                
        except Error as e:
                print(e)                
