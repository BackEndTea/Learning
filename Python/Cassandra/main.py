#! /usr/bin/python
from cassandra.cluster import Cluster
import uuid

cluster = Cluster()
session = cluster.connect('cycling')

session.execute("DROP TABLE IF EXISTS users")
session.execute("""
CREATE TABLE users (
    id uuid,
    name text,
    age int,
    email text,
    PRIMARY KEY (id))
""")
session.execute(
    """
    INSERT INTO users (id,name, age, email)
    VALUES (%s, %s, %s, %s)
    """,
    (uuid.uuid4(), "John O'Reilly", 42, "john@johnsite.org")
)
rows = session.execute('SELECT name, age, id, email FROM users')
for user_row in rows:
    print user_row.name, user_row.age, user_row.id, user_row.email

