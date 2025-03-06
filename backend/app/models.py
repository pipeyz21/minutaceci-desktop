from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float

class Base(DeclarativeBase):
  pass

# Modelo de clientes
class Customer(Base):
  __tablename__ = "customers"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  name = Column(String, nullable=False)
  phone = Column(String, nullable=True)

# Modelo de pedidos
class Order(Base):
  __tablename__ = "orders"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  customer_id = Column(Integer, ForeignKey("customers.id"))
  date = Column(DateTime, nullable=False)
  discount = Column(Float, default=0.0)
  total = Column(Float, default=0.0)

  customer = relationship("Customer")

class OrderDetails(Base):
  __tablename__ = "orders_details"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
  main_id = Column(Integer, ForeignKey("mains.id"), nullable=False)
  side_id = Column(Integer, ForeignKey("sides.id"), nullable=True)
  extra_id = Column(Integer, ForeignKey("extras.id"), nullable=True)
  type = Column(String, nullable=False)
  price = Column(Integer, nullable=False)
  quantity = Column(Integer, nullable=False)

  order = relationship("Order")
  main = relationship("Main")
  side = relationship("Side")
  extra = relationship("Extra")
  
class Main(Base):
  __tablename__ = "mains"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  name = Column(String, nullable=False)
  price = Column(Float, nullable=False)
  category = Column(String, nullable=True)

class Side(Base):
  __tablename__ = "sides"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  name = Column(String, nullable=False)
  category = Column(String, nullable=True)

class Extra(Base):
  __tablename__ = "extras"

  id = Column(Integer, primary_key=True, index=True, autoincrement=True)
  name = Column(String, nullable=False)