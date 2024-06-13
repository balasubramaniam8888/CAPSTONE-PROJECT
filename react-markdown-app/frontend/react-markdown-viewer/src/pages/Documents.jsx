import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://capstone-project-yjpg.onrender.com/api/documents', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);



  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://capstone-project-yjpg.onrender.com/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
     
      setDocuments(documents.filter(doc => doc._id !== id));
    } catch (err) {
      console.error('Error deleting document:', err.response ? err.response.data : err.message);
    }
  };


  // const handleDelete = async (id) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     const response = await fetch(`https://capstone-project-yjpg.onrender.com/api/documents/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to delete document');
  //     }
  //     setDocuments(documents.filter(doc => doc._id !== id));
  //   } catch (err) {
  //     console.error('Error deleting document:', err.message);
  //   }
  // }


  const handleDownload = (document) => {
    const blob = new Blob([document.content], { type: 'text/markdown' });
    saveAs(blob, `${document.title}.md`);
  };

  return (
    <div className="container">
      <h2>Your Documents</h2>
      <Link to="/documents/new" className="btn btn-dark mb-3">Create New Document</Link>
      <ul className="list-group">
        {documents.map((doc) => (
          <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center  text-light">
            <Link to={`/documents/${doc._id}`}>{doc.title}</Link>
            <div>
              <button onClick={() => handleDownload(doc)} className="btn btn-secondary btn-sm mx-1">Download</button>
              <button onClick={() => handleDelete(doc._id)} className="btn btn-danger btn-sm mx-1">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
