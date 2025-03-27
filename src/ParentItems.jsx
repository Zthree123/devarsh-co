import React, { useEffect, useState } from 'react'
import ItemMaster from './ItemMaster';
import Billing from './Billing';

const ParentItems = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("https://api.zthree.in/bizsura/Products?action=showProducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer your_secret_api_key"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Full API Response:", data);

                if (data && data.success && Array.isArray(data.results)) {
                    setProducts(data.results);
                    console.log("Updated Products:", [...data.results]);

                } else {
                    console.error("API Error:", data.message);
                }
            })
            .catch((error) => console.error("Fetch Error:", error));
    }, []);

    return (
        <div>
            {products.length > 0 ? <ItemMaster products={products} /> : <p>Loading...</p>}
            <Billing products={products || []} />
        </div>
    )
}

export default ParentItems
