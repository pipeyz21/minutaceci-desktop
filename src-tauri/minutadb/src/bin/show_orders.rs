use self::models::*;
use diesel::prelude::*;
use minutadb_pg::*;

fn main() {
    use self::schema::orders::dsl::*;
    
    let connection = &mut establish_connection();
    let results = orders
        .filter(sale_id.eq(1))
        .select(Order::as_select())
        .load(connection)
        .expect("Error cargando ordenes");

    print("Resultado: {}", results)
}