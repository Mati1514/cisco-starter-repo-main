import './App.css';
import React, { useEffect, useState } from 'react';

function PacketLatency() {
  const [latency, setLatency] = useState(null);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const WebSocket = require('websocket').w3cwebsocket;
    const ws = new WebSocket('ws://localhost:55455');

    ws.onopen = () => {
      setConnectionError(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionError(true);
    };

    ws.onmessage = (message) => {
      const packetTimestamp = parseInt(message.data, 10);
      const currentTimestamp = Date.now();
      const packetLatency = currentTimestamp - packetTimestamp;
      setLatency(packetLatency);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {connectionError ? (
        <p>Error connecting to the WebSocket server.</p>
      ) : (
        <p>Packet latency: {latency === null ? 'Loading...' : `${latency} ms`}</p>
      )}
    </div>
  );
}


function IpAddress({ ipVersion }) {
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch(`https://api.ipify.org?format=json&ip_version=${ipVersion}`);
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, [ipVersion]);

  return (
    <div>
      <p>Your public IPv{ipVersion} address: {ipAddress || 'Loading...'}</p>
    </div>
  );
}

function Banner() {
  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>SEXTANT</h1>
          <p>cisco</p>
        </div>
      </div>
    </div>
  );
}

function Exhibit({ title, children }) {
  return (
    <div className="exhibit">
      <h2 className="exhibit-title">{title}</h2>
      <div className="exhibit-content">
        {children}
      </div>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <Banner />        
      <Exhibit title="IPv4 Address">
        <IpAddress ipVersion={4} />
      </Exhibit>
      <Exhibit title="IPv6 Address">
        <IpAddress ipVersion={6} />
      </Exhibit>
      <Exhibit title="Packet Latency">
        <PacketLatency />
      </Exhibit>
    </div>
  );
}

export default App;
