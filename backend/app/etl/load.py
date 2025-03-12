from datetime import datetime
from app.database import engine, Base
from typing import Type
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
import asyncio
import polars as pl
import os

# Crear una sesión síncrona (porque las operaciones de ETL no son asíncronas)
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)

async def create_tables():
  """Crea las tablas en la base de datos de forma asíncrona."""
  async with engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)

async def save_df(df: pl.DataFrame, model: Type[declarative_base]) -> None:
  """
    Guarda un DataFrame en la base de datos sin usar Pandas.
    Si la tabla no existe, la crea antes de insertar los datos.

    :param df: DataFrame de Polars con los datos.
    :param model: Modelo de SQLAlchemy que representa la tabla.
  """

  # Guardar archivo CSV temporal
  temp_csv = f"temp_{model.__tablename__}.csv"
  df.write_csv(temp_csv)

  # Leer csv fila por fila e insertar en la base de datos
  async with SessionLocal() as session:
    try:
      await asyncio.to_thread(process_csv, temp_csv, session, model)
      await session.commit()
      print(f"Datos insertados en {model.__tablename__}")

    except SQLAlchemyError as e:
      await session.rollback()
      print(f"Error insertando en {model.__tablename__}: {e}")

    finally: 
      os.remove(temp_csv)

def process_csv(temp_csv: str, session, model: Type[declarative_base]) -> None:
  with open(temp_csv, "r", encoding="utf-8") as file:
    headers = file.readline().strip().split(",")
    for line in file:
      values = line.strip().split(",")
      data_dict = dict(zip(headers, values))

       # Si la columna 'date' (o 'Date') está presente, convertir el string a objeto date.
      # Manejar la conversión de la columna 'date'
      if "date" in data_dict:
        date_str = data_dict["date"].strip()
        if date_str == "":
          # Opción 1: Asignar un valor por defecto
          data_dict["date"] = datetime(1970, 1, 1).date()
          # Opción 2: Omitir la fila
          # continue
        else:
          data_dict["date"] = datetime.strptime(date_str, "%Y-%m-%d").date()

      if "id" in data_dict:
        data_dict["id"] = int(data_dict["id"])

      if "side_id" in data_dict:
        if data_dict.get("side_id", "") == "":
          data_dict["side_id"] = None
      
      if "extra_id" in data_dict:
        if data_dict.get("extra_id", "") == "":
          data_dict["extra_id"] = None

      session.add(model(**data_dict))