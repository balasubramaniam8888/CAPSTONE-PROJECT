import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { IoDocuments } from "react-icons/io5";
import { ImFolderDownload } from "react-icons/im";
import { MdFolderDelete } from "react-icons/md";

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "https://capstone-project-yjpg.onrender.com/api/documents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(response.data);
      } catch (err) {
        console.error(
          "Error fetching documents:",
          err.response ? err.response.data : err.message
        );
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://capstone-project-yjpg.onrender.com/api/documents/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Delete response:", response);
      if (response.status === 200) {
        setDocuments(documents.filter((doc) => doc._id !== id));
      } else {
        console.error("Error deleting document:", response.data);
      }
    } catch (err) {
      console.error(
        "Error deleting document:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleDownload = (document) => {
    const blob = new Blob([document.content], { type: "text/markdown" });
    saveAs(blob, `${document.title}.md`);
  };

  return (
    <>
      <div className="container border border-black ">
        <h2><IoDocuments />   Your Documents</h2>
        <Link to="/documents/new" className="btn btn-dark mb-3">
          Create New Document
        </Link>
        <ul className="list-group">
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link to={`/documents/${doc._id}`}>{doc.title}</Link>
              <div>
                <button
                  onClick={() => handleDownload(doc)}
                  className="btn btn-secondary btn-md mx-2"
                >
                 <ImFolderDownload />
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="btn btn-danger btn-md mx-2"
                >
                <MdFolderDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Link to={'/login'}><button className="btn btn-dark">Back</button></Link>
        
      </div>

      <div className="text-center">
        <p>Please Click On The Document Link To <b>EDIT</b></p>
      </div>
    </>
  );
};

export default Documents;
