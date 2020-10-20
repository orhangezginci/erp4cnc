
from falcon_autocrud.resource import CollectionResource, SingleResource
from models import *

class MachineCollectionResource(CollectionResource):
    model = Machine
    methods = ['GET', 'POST']


class MachineResource(SingleResource):
    model = Machine
