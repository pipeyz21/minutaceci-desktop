// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use chrono::NaiveDate;
use minutadb::{create_sale, establish_connection, models::Sale};

#[tauri::command]
fn create_sale_command (
    date: String,
    client_id: i32,
    status: String,
    payment: String,
) -> Result<Sale, String> {
    let conn = &mut establish_connection();

    let parsed_date = NaiveDate::parse_from_str(&date, "%Y-%m-%d")
        .map_err(|e| format!("Error parsing date: {:?}", e))?;

    match create_sale(conn, &parsed_date, &client_id, &status, &payment) {
        Ok(sale) => Ok(sale), // Si es exitoso, devuelve el `Sale`
        Err(err) => Err(format!("Error guardando nueva venta: {:?}", err)), // Convierte el error a String
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_sale_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
