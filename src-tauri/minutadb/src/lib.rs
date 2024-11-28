pub mod models;
pub mod schema;

use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenvy::dotenv;
use std::env;
use chrono::NaiveDate;

use self::models::*;

pub fn establish_connection() -> PgConnection {
    // Imprime un mensaje de debug para verificar que la función se está llamando
    println!("Intentando establecer conexión con la base de datos...");
    
    // Carga el archivo .env y verifica si se cargó correctamente
    if let Ok(_) = dotenv() {
        println!("Archivo .env cargado correctamente");
    } else {
        println!("No se pudo cargar el archivo .env");
    }

    // Intenta obtener la URL de la base de datos e imprime su estado
    match env::var("DATABASE_URL") {
        Ok(url) => println!("URL de base de datos encontrada: {}", url),
        Err(e) => println!("Error al obtener DATABASE_URL: {:?}", e),
    }

    // Obtiene la URL y establece la conexión
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL debe estar configurada en el archivo .env");

    PgConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error conectando a {}", database_url))
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

    // Configuración de tipo de orden => Almuerzos u Otros
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