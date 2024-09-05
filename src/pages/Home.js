import React, { useEffect, useState } from "react";
import { searchForWSI } from "../services/api";

function HomePage() {
    consts[item, setItem] = useState([]);

    useEffect(() => {
        const getItems = async (formData) => {
            try {
                const query = formData.get("query");
                const data = await searchForWSI(query);
                setItem(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        getItems();
    }, []);

    return (
        <div>
            <h1>Whole Slide Image</h1>
            <div>
                <text>{item.path}</text>
            </div>
            <form action={getItems}>
                <input name="query"/>
                <button type="submit">Search</button>
            </form>
        </div>
    );
    
}

export default HomePage;