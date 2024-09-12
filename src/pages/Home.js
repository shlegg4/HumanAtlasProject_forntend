import React, { useState } from 'react';
import { searchForWSI } from '../services/api'
import WebSocketComponent from '../services/websocketConnection';
import ImageWithPoints from '../components/imageDisplay';

function HomePage() {
    const [item, setItem] = useState(null);  // Holds the fetched item data
    const [imageUrl, setSearchQuery] = useState('');  // Holds the search query input value
    const [boundary, setBoundary] = useState('');  // Holds the boundary input value
    const [image, setImage] = useState(null);  // Holds the image data including the URL and points

    // Function to handle the image update coming from WebSocketComponent
    const handleImageUpdate = (imageData) => {
        console.log(imageData.path);
        setImage(imageData);
    };

    // Function to handle input changes and update searchQuery state
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);  // Update state with input value
    };

    // Function to handle boundary input changes and update boundary state
    const handleBoundaryChange = (event) => {
        setBoundary(event.target.value.split(',').map(Number));  // Update state with input value
    };

    // Function to fetch items based on the search query and boundary
    const getItems = async () => {
        try {
            const data = await searchForWSI(imageUrl, boundary, 50);  // Use searchQuery and boundary in the API call
            setItem(data);  // Update item state with the fetched data
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div>
            <h1>Whole Slide Image</h1>
            <div>
                {/* Safely render item path if item is available */}
                {item && <p>{item.path}</p>}
            </div>
            <div>
                {/* Handle input change event for image URL */}
                <input
                    type="text"
                    name="query"
                    value={imageUrl}  // Bind value to the searchQuery state
                    onChange={handleInputChange}  // Update state on change
                />
                {/* Handle input change event for boundary */}
                <input
                    type="text"
                    name="boundary"
                    value={boundary}  // Bind value to the boundary state
                    onChange={handleBoundaryChange}  // Update state on change
                />
                <button type="submit" onClick={getItems}>Search</button>
            </div>

            {/* WebSocket connection and image update handler */}
            <WebSocketComponent onImageUpdate={handleImageUpdate} />

            {/* Conditionally render the image with the center point */}
            {image && image.url && boundary? (
                <div>
                    {/* Pass the image URL and the calculated center point */}
                    <ImageWithPoints imageUrl={image.url} points={[image.path, boundary ]} />
                    <p>Vector Data: {JSON.stringify(image.vector)}</p>
                </div>
            ) : (
                <p>No image to display yet...</p>
            )}
        </div>
    );
}

export default HomePage;
