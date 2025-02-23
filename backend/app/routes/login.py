from fastapi import APIRouter, Depends, HTTPException
from app.auth import verify_password, create_access_token
from datetime import timedelta
# from app.db import get_user_by_email

router = APIRouter()

@router.post("/login")
def login(email: str, password: str) -> dict:
  user = "" # función para obtener usuario
  if not user or not verify_password(password, user.hashed_password):
    raise HTTPException(status_code=400, detail="Credenciales incorrectas")
  token = create_access_token({"sub": user}. timedelta(days=1))
  return {"access_token": token, "token_type": "bearer"}


