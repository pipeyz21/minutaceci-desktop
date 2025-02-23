from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt

SECRET_KEY = "CLAVE_SECRETA"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrpyt"], deprecated="auto")

def hash_password(password: str):
  return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
  return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta):
  to_encode = data.copy()
  expire = datetime.now() + expires_delta
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, ALGORITHM) 
