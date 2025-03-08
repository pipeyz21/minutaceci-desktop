import sys
import os

# Agregar la raíz del proyecto al PATH para que se reconozcan los módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

# Ahora puedes importar los módulos correctamente
from app.etl.extract import *
from app.etl.transform import *
from app.etl.load import *
from app.models import *

import asyncio

async def run_pipeline():
  file_path = "data/raw/input.xlsx"

  print("📤 Extrayendo datos...")
  df_list = extract_multiple_sheets(file_path, ["Almuerzos", "Otros_Ingresos"])
  df_mains = extract_multiple_sheets(file_path, ["Principales", "Otros_Ingresos"])
  df_sides = extract_sheet(file_path, "Acompañamientos")
  
  print("🔄 Transformando datos...")
  df_extras= transform_extras(df_list)
  df_mains = transform_mains(df_mains)
  df_sides = transform_sides(df_sides)
  df_customers = transform_customers(df_list)
  df_orders = transform_orders(df_list, df_customers)
  df_orders_details = transform_orders_details(df_list, df_mains, df_sides, df_extras)

  print(df_orders.dtypes)
  print(df_orders.columns)

  print("💾 Creando tablas en la base de datos...")
  # await create_tables()  # 🔥 Asegura que las tablas existen antes de insertar datos

  print("💾 Insertando en la base de datos...")
  await save_df(df_customers, Customer)
  await save_df(df_mains, Main)
  await save_df(df_sides, Side)
  await save_df(df_extras, Extra)
  await save_df(df_orders, Order)
  await save_df(df_orders_details, OrderDetails)

  print("✅ ETL completado.")
if __name__ == "__main__":
  asyncio.run(run_pipeline())