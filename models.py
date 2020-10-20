
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String,Boolean,DateTime

Base = declarative_base()

class Machine(Base):
    __tablename__  = 'Machine'
    id      = Column(Integer, primary_key=True)
    name    = Column(String(50))
    rev1    = Column(Boolean, unique=False, default=True)
    rev2    = Column(Boolean, unique=False, default=True)
    frassspin=Column(Boolean, unique=False, default=True)
    createdAt=Column(DateTime,nullable=False)
    visible  =Column(Boolean, unique=False, default=True)

    engine = create_engine('postgresql://postgres:987521@localhost:5432/db-main')
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
