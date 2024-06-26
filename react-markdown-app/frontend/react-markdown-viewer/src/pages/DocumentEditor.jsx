import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./DocumentEditor.css"; // Ensure this file exists for custom styling
import { IoCreateOutline } from "react-icons/io5";
import { BsFillSave2Fill } from "react-icons/bs";

const DocumentEditor = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchDocument = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `https://capstone-project-yjpg.onrender.com/api/documents/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (err) {
          console.error(err);
        }
      };

      fetchDocument();
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (id) {
        await axios.put(
          `https://capstone-project-yjpg.onrender.com/api/documents/${id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "https://capstone-project-yjpg.onrender.com/api/documents",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate("/documents");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column">
      <h2 className="my-3 text-center display-6">
        {" "}
        <IoCreateOutline />
        {id ? "Edit Document" : "New Document"}
      </h2>
      <form onSubmit={handleSave} className="d-flex flex-column flex-grow-1">
        <div className="form-group mb-3 col">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="row flex-grow-1">
          <div className="col-md-6 h-100">
            <textarea
              className="form-control h-100"
              placeholder="Enter Your (Markdown) Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="20"
            />
          </div>
          <div className="col-md-6 h-100 markdown-preview-container">
            <div className="markdown-preview border p-3">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-lg  w-25 align-self-end"
        >
          <BsFillSave2Fill />
        </button>
      </form>
    </div>
  );
};

export default DocumentEditor;
