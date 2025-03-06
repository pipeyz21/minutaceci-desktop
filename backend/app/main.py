from database import engine, init_db
from app.models import Base
from contextlib import asynccontextmanager
from fastapi import FastAPI

# Revisar si la base de datos existe
@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield

app = FastAPI(lifespan=lifespan)

# Crear tablas en la base de datos
async def init_db():
  async with engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)
