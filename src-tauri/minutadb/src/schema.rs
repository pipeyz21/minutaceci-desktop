// @generated automatically by Diesel CLI.

diesel::table! {
    clients (id) {
        id -> Int4,
        name -> Varchar,
        phone -> Varchar,
        address -> Nullable<Varchar>,
    }
}

diesel::table! {
    orders (id) {
        id -> Int4,
        sale_id -> Int4,
        product -> Int4,
        garnish -> Nullable<Int4>,
        extra -> Nullable<Int4>,
        price -> Int4,
        qty -> Int4,
        order_type -> Text,
    }
}

diesel::table! {
    products (id) {
        id -> Int4,
        name -> Text,
        category -> Text,
        subcategory -> Nullable<Text>,
    }
}

diesel::table! {
    sales (id) {
        id -> Int4,
        date -> Date,
        client_id -> Int4,
        status -> Text,
        payment -> Text,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    clients,
    orders,
    products,
    sales,
);
