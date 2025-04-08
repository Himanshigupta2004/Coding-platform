import React, { useState } from 'react';
import axios from 'axios';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    constraints: '',
    sampleInput: '',
    sampleOutput: '',
    hiddenInput: '',
    hiddenOutput: '',
    difficulty: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/questions/add-question', formData);
      alert('Question Added Successfully!');
    } catch (err) {
      alert('Failed to Add Question');
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      color: '#333',
      fontSize: '2rem',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      color: '#2c3e50',
      fontSize: '1.1rem',
      fontWeight: '500',
      textTransform: 'capitalize',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      resize: 'vertical',
      minHeight: '100px',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    button: {
      padding: '12px 20px',
      fontSize: '1.1rem',
      backgroundColor: '#2980b9',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      alignSelf: 'center',
      width: '200px',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Question</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={styles.formGroup}>
            <label style={styles.label}>{field}</label>
            <textarea
              name={field}
              onChange={handleChange}
              rows="4"
              cols="50"
              style={styles.textarea}
            />
          </div>
        ))}
        <button type="submit" style={styles.button}>
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;