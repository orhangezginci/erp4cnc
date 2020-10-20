from sqlalchemy import create_engine
import falcon
from resources import *
from falcon_autocrud.middleware import Middleware



db_engine = create_engine('postgresql://postgres:987521@localhost:5432/db-main')

# Enable CORS policy for example.com and allows credentials
app = falcon.API(middleware=[
    CORSComponent()
])
#app = falcon.API(
#    middleware=[Middleware()])



app.add_route('/machines', MachineCollectionResource(db_engine))
app.add_route('/machine/{id}', MachineResource(db_engine))
