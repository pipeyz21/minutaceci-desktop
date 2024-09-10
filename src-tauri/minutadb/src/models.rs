use crate::schema::*;
use chrono::NaiveDate;
use diesel::prelude::*;
use serde::Serialize;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = crate::schema::orders)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Order {
    pub id: i32,
    pub sale_id: i32,
    pub product: i32,
    pub garnish: Option<i32>,
    pub extra: Option<i32>,
    pub price: i32,
    pub qty: i32,
    pub order_type: String,
}

#[derive(Insertable, Serialize)]
#[diesel(table_name = orders)]
pub struct NewOrder<'a> {
    pub sale_id: &'a i32,
    pub product: &'a i32,
    pub garnish: Option<i32>,
    pub extra: Option<i32>,
    pub price: &'a i32,
    pub qty: &'a i32,
    pub order_type: &'a str,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = sales)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Sale {
    pub id: i32,
    pub date: NaiveDate,
    pub client_id: i32,
    pub status: String,
    pub payment: String
}

#[derive(Insertable, Serialize)]
#[diesel(table_name = sales)]
pub struct NewSale<'a> {
    pub date: &'a NaiveDate,
    pub client_id: &'a i32,
    pub status: &'a str,
    pub payment: &'a str,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = clients)]
#[diesel(check_for_backend(diesel::pg::Pg))]
struct Client {
    pub id: i32,
    pub name: String,
    pub phone: String,
    pub address: Option<String>,
}

#[derive(Insertable, Serialize)]
#[diesel(table_name = clients)]
struct NewClient<'a> {
    pub name: &'a str,
    pub phone: &'a str,
    pub address: Option<String>
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = products)]
#[diesel(check_for_backend(diesel::pg::Pg))]
struct Product {
    pub id: i32,
    pub name: String,
    pub category: String,
    pub subcategory: Option<String>
}

#[derive(Insertable, Serialize)]
#[diesel(table_name = products)]
struct NewProduct<'a> {
    pub name: &'a str,
    pub category: &'a str,
    pub subcategory: Option<String>
}