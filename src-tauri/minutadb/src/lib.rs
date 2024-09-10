pub mod models;
pub mod schema;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use chrono::NaiveDate;

use self::models::*;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL").expect("Se debe configurar la base de datos.");
    PgConnection::establish(&db_url)
        .unwrap_or_else(|_| panic!("Error conectandose a la base de datos."))

}

pub fn create_sale(
    conn: &mut PgConnection,
    date: &NaiveDate,
    client_id: &i32,
    status: &str,
    payment: &str
) -> Result<Sale, diesel::result::Error> {
    use crate::schema::sales;

    let new_sale = NewSale {
        date,
        client_id,
        status,
        payment
    };

    diesel::insert_into(sales::table)
        .values(&new_sale)
        .returning(Sale::as_returning())
        .get_result(conn)
        // .expect("Error guardando nueva venta")
}

pub fn create_order (
    conn: &mut PgConnection,
    sale_id: &i32,
    product: &i32,
    garnish: Option<i32>,
    extra: Option<i32>,
    price: &i32,
    qty: &i32,
) -> Result<Order, diesel::result::Error> {
    use crate::schema::orders;

    let order_type = "Almuerzos";

    let new_order = NewOrder {
        sale_id,
        product,
        garnish,
        extra,
        price,
        qty,
        order_type
    };

    diesel::insert_into(orders::table)
        .values(&new_order)
        .returning(Order::as_returning())
        .get_result(conn)
}