"use client"; // This makes it a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [code, setCode] = useState('');
    const [suggestion, setSuggestion] = useState('');

    // Get the API base URL from environment variables
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const res = await fetch('/api/get-suggestion', { method: 'POST' });
                const data = await res.json();
                setSuggestion(data.suggestion || '');
            } catch (error) {
                console.error('Error fetching initial suggestion:', error);
            }
        };

        fetchSuggestion();
    }, []);

    const getSuggestion = async () => {
        try {
            const res = await axios.post(`${API_BASE_URL}/generate-code`, { 
                code, 
                language: "JavaScript" 
            });
            setSuggestion(res.data.suggestion);
        } catch (error) {
            console.error('Error fetching code suggestion:', error);
            setSuggestion('Error fetching suggestion. Please try again.');
        }
    };

    // Internal CSS using JavaScript objects
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
        },
        textarea: {
            width: '100%',
            height: '120px',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'none',
        },
        button: {
            marginTop: '10px',
            padding: '10px 15px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        pre: {
            textAlign: 'left',
            backgroundColor: '#eee',
            padding: '10px',
            borderRadius: '5px',
            marginTop: '10px',
            overflowX: 'auto',
        },
    };

    return (
        <div style={styles.container}>
            <h1>AI Coding Assistant</h1>
            <textarea 
                style={styles.textarea}
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
                placeholder="Enter code..."
            />
            <button style={styles.button} onClick={getSuggestion}>Get Suggestion</button>
            <pre style={styles.pre}>{suggestion}</pre>
        </div>
    );
}
