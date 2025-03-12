import polars as pl
from typing import List

def same_transformations(list_df: List[pl.DataFrame]) -> pl.DataFrame:
  # Operaciones para transformar la hoja Almuerzos
  df_lunchs = list_df[0].clone()
  df_lunchs = df_lunchs.insert_column(1, pl.Series("Type", ["Almuerzo"] * df_lunchs.height))
  df_lunchs = df_lunchs.rename({
    "Boleta": "Id",
    "Fecha": "Date",
    "Nombre_Cliente": "Customer",
    "Principal": "Main",
    "Acompañamiento": "Side",
    "Cantidad": "Quantity",
    "Precio": "Price",
    "Descuento": "Discount",
    "Ensalada": "Extra"
  })
  max_id = df_lunchs.select(pl.col("Id")).max().item() if df_lunchs.height > 0 else 0
  
  # Operaciones para transformar la hoja Otros_Ingreos
  df_individuals = list_df[1].clone()
  df_individuals = df_individuals.insert_column(1, pl.Series("Type", ["Individual"] * df_individuals.height))
  df_individuals = df_individuals.insert_column(5, pl.Series("Side", ["Individual"] * df_individuals.height))
  df_individuals = df_individuals.insert_column(6, pl.Series("Extra", ["Individual"] * df_individuals.height))
  df_individuals = df_individuals.insert_column(9, pl.Series("Discount", [0] * df_individuals.height))
  min_id = df_individuals.select(pl.col("Boleta")).min().item() if df_individuals.height > 0 else 0
  df_individuals = df_individuals.with_columns(pl.col("Boleta") + max_id + 1) 
  df_individuals = df_individuals.rename({
    "Boleta": "Id",
    "Fecha": "Date",
    "Cliente": "Customer",
    "Producto": "Main",
    "Cantidad": "Quantity",
    "Precio": "Price",
  })
  df_individuals = df_individuals.cast({"Price": pl.Int64})

  return pl.concat([df_lunchs, df_individuals])

def transform_orders(list_df: List[pl.DataFrame], df_customers: pl.DataFrame) -> pl.DataFrame:
  df = same_transformations(list_df).clone()
  df = df.select([
    "Id",
    "Date",
    "Customer",
    "Discount",
    "Total"
  ])
  
  df = df.group_by(["Id", "Date", "Customer"]).sum()

  # Realizar join para incorporar el ID del plato principal
  df = df.join(
    df_customers.select(pl.col("name").alias("Customer"), pl.col("id").alias("customer_id")),
    on="Customer",
    how="left"
  )  

  df = df.with_columns(pl.col("Date").cast(pl.Date))
  df = df.drop("Customer")

  df = df.insert_column(5, pl.Series("delivered", ["Si"] * df.height))
  df = df.insert_column(6, pl.Series("payment_method", ["Efectivo"] * df.height))
  df = df.insert_column(7, pl.Series("payment_status", ["Pagado"] * df.height))
 
  return df.rename({col: col.lower() for col in df.columns})

def transform_orders_details(
  list_df: List[pl.DataFrame],
  df_mains: pl.DataFrame,
  df_sides: pl.DataFrame,
  df_extras: pl.DataFrame,
) -> pl.DataFrame:
  df = same_transformations(list_df).clone()
  df = df.select([
    "Id",
    "Type",
    "Main",
    "Side",
    "Extra",
    "Price",
    "Quantity"
  ])
  df = df.rename({"Id": "Order_Id"})
  
  # Realizar join para incorporar el ID del plato principal
  df = df.join(
    df_mains.select(pl.col("name").alias("Main"), pl.col("id").alias("main_id")),
    on="Main",
    how="left"
  )

  # Realizar join para incorporar el ID del acompañamiento
  df = df.join(
    df_sides.select(pl.col("name").alias("Side"), pl.col("id").alias("side_id")),
    on="Side",
    how="left"
  )

  # Realizar join para incorporar el ID del plato principal
  df = df.join(
    df_extras.select(pl.col("name").alias("Extra"), pl.col("id").alias("extra_id")),
    on="Extra",
    how="left"
  )

  # Remover columnas innecesarias
  df = df.drop("Main", "Side", "Extra")
  df = df.with_columns(pl.arange(1, df.height + 1).alias("Id"))

  return df.rename({col: col.lower() for col in df.columns})

def transform_customers(list_df: List[pl.DataFrame]) -> pl.DataFrame:
  df = same_transformations(list_df)
  df = df.group_by("Customer").count()
  df = df.drop("count")
  df = df.rename({"Customer": "name"})
  df = df.with_columns(pl.arange(1, df.height + 1).alias("Id"))

  return df.rename({col: col.lower() for col in df.columns})

def transform_mains(list_df: List[pl.DataFrame]) -> pl.DataFrame:
  # Transformación de almuerzos
  df_launchs = list_df[0].clone()
  df_launchs = df_launchs.drop("Vencimiento")
  df_launchs = df_launchs.group_by(["Categoria", "Principal"]).max()

  # Transformación de productos individuales
  df_individuals = list_df[1].clone()
  df_individuals = df_individuals.drop("Boleta", "Fecha", "Cliente", "Cantidad", "Total")
  df_individuals = df_individuals.rename({"Producto": "Principal"})
  df_individuals = df_individuals.insert_column(0, pl.Series("Categoria", ["Individual"] * df_individuals.height))
  df_individuals = df_individuals.cast({"Precio": pl.Int64})
  df_individuals = df_individuals.group_by(["Categoria", "Principal"]).max()

  # Concatenación de dataframes
  df = pl.concat([df_launchs, df_individuals])
  df = df.with_columns(pl.arange(1, df.height + 1).alias("Id"))
  df = df.rename({
    "Categoria": "category",
    "Principal": "name",
    "Precio": "price"
  })
  return df.rename({col: col.lower() for col in df.columns})

def transform_sides(df: pl.DataFrame) -> pl.DataFrame:
  df = df.clone()
  df = df.with_columns(pl.arange(1, df.height + 1).alias("Id"))
  df = df.rename({
    "Acompañamiento":"name", 
    "Categoria2":"category"
  })
  return df.rename({col: col.lower() for col in df.columns})

def transform_extras(list_df: List[pl.DataFrame]) -> pl.DataFrame:
  df = same_transformations(list_df).clone()
  df = df.select("Extra").group_by("Extra").count()
  df = df.with_columns(pl.arange(1, df.height + 1).alias("Id"))
  df = df.select("Id", "Extra")
  df = df.rename({"Extra":"name"})
  return df.rename({col: col.lower() for col in df.columns})