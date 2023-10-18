import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useWebSocketConnection = (url, subscribeUrl, onMessageReceived) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS(url);
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log("Connected: " + frame);
      if (client.connected) {
        client.subscribe(subscribeUrl, (response) => {
          onMessageReceived(response.body);
        });
      }
    });

    setStompClient(client);

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, [url, subscribeUrl, onMessageReceived]);

  return stompClient;
};
