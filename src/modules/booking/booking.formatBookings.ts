const formatBookings = (rows: any[], role: string) => {
    return rows.map((row) => {
        const base = {
            id: row.id,
            vehicle_id: row.vehicle_id,
            rent_start_date: row.rent_start_date.toISOString().split("T")[0],
            rent_end_date: row.rent_end_date.toISOString().split("T")[0],
            total_price: row.total_price,
            status: row.status,
            vehicle: {
                vehicle_name: row.vehicle_name,
                registration_number: row.registration_number,
                type: row.type,
            },
        };

        // Admin gets customer details
        if (role === "admin") {
            return {
                ...base,
                customer_id: row.customer_id,
                customer: {
                    name: row.customer_name,
                    email: row.customer_email,
                },
            };
        }

        // Customer view (simple)
        return base;
    });
};
export default formatBookings;