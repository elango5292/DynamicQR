"use client"
import { redirect,useParams, useSearchParams  } from 'next/navigation'
import useSWR from 'swr';
import { useState, useEffect } from 'react';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Profile() {
    const { slug } = useParams(); // Assuming 'slug' is the parameter name in the URL

    const [words, setWords] = useState('');

    useEffect(() => {
        async function handleCollect() {
            try {
                const res = await fetch('/api/dest', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: slug }),
                });
                const data = await res.json();
                setWords(data.post); // Update the state with fetched data
            } catch (error) {
                console.error(error);
            }
        }
        
        handleCollect();
    }, [slug]); // Trigger the effect whenever 'slug' changes

    console.log(words);

    // ... Rest of your component code
}
