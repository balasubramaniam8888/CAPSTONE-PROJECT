import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

const Document = () => {
  const { id } = useParams();
  const [document, setDocument] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchDocument = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3000/api/documents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocument(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocument();
  }, [id]);

  const handleSave = () => {
    const blob = new Blob([document.content], { type: 'text/markdown' });
    saveAs(blob, `${document.title}.md`);
  };

  return (
    <div>
      <h2>{document.title}</h2>
      <textarea value={document.content} readOnly></textarea>
      <button onClick={handleSave}>Download</button>
    </div>
  );
};

export default Document;