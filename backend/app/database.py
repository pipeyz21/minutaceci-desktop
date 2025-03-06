from dotenv import load_dotenv
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base
import os

# Cargar variables de entorno
load_dotenv()

# URL de la base de datos
ENV = os.getenv("ENV", "development")

# Usar SQLite en dev y Turso en prod.
if ENV == "development":
  DATABASE_URL = os.getenv("DATABASE_URL_DEV")
else:
  DATABASE_URL = os.getenv("DATABASE_URL_PROD")

# Configurar motor de bd
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# Crear sesiones asincrónicas
AsyncSessionLocal = sessionmaker(
  bind=engine, 
  class_=AsyncSession, 
  expire_on_commit=False
)

# Dependencias para obtener la sesión
async def get_db():
  async with AsyncSessionLocal() as session:
    yield session

# Función para verificar si la base de datos tiene tablas
async def check_database():
  async with engine.begin() as conn:
    result = await conn.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
    tables = result.fetchall()
    return len(tables) > 0 

# Función para crear la base de datos solo si no existe
async def init_db():
  exists = await check_database()
  if not exists:
    async with engine.begin() as conn:
      await conn.run_sync(Base.metadata.create_all)
      print("Base de datos creada")