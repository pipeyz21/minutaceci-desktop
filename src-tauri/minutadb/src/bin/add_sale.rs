use minutadb::*;
use chrono::NaiveDate;

fn main () {
    let connection = &mut establish_connection();

    let date:NaiveDate = NaiveDate::from_ymd_opt(2024, 8, 16).expect("Fecha inválida");
    let client_id: i32 = 1;
    let status = "Finalizado" ;
    let payment = "Banco Chile";

    let sale = create_sale(connection, &date, &client_id, status, payment);
    println!("Se ha creado una venta con el id {}", sale.id)
    
}