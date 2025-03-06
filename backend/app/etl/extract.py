import polars as pl
import os
from typing import List

def extract_multiple_sheets(file_path: str, sheet_list: List[str]) -> List[pl.DataFrame]:
  if not os.path.exists(file_path):
    raise FileNotFoundError(f"El archivo no existe")

  return [pl.read_excel(file_path, sheet_name=sheet) for sheet in sheet_list]


def extract_sheet(file_path: str, sheet_name: str) -> pl.DataFrame:
  if not os.path.exists(file_path):
    raise FileNotFoundError(f"El archivo no existe")
  
  return pl.read_excel(file_path, sheet_name=sheet_name)
