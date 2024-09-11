import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebSocketComponent = ({ onImageUpdate }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:4000/ws');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message received:', data);
      setMessage(data);
      fetchTaskResult(data.task_id); // Fetch result based on task ID
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const fetchTaskResult = async (taskId) => {
    try {
      const response = await axios.get(`http://localhost:4000/search/result`, {
        params: { task_id: taskId }
      });

      console.log("Full response:", response);

      if (response && response.data) {
        const result = response.data.result;

        console.log("Result object:", result);

        if (result && result.prediction) {
          const { url, vector, path } = JSON.parse(result.prediction);

          console.log("Image URL:", url);
          console.log("Vector:", vector);
          console.log("Path:", path);

          // Send the parsed image data up to the parent
          onImageUpdate({ url, vector, path });
        } else {
          console.log("No prediction found in result.");
        }
      }
    } catch (error) {
      console.error('Error fetching task result:', error);
    }
  };

  return (
    <div>
      <h2>WebSocket Messages</h2>
      {message ? (
        <pre>{JSON.stringify(message, null, 2)}</pre>
      ) : (
        <p>No message received yet...</p>
      )}
    </div>
  );
};

export default WebSocketComponent;
