import { useState } from "react";
import styled from "styled-components";

function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    year: new Date().getFullYear(),
    length: "0",
    director: "",
    description: "",
    poster_url: "",
    category: "",
    discount: false,
    female_director: false,
  });
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Movie created:", data);
        // Redirect or perform other actions for successful response
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle any other errors
    }
  }

  function handleChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        {/* Rest of the form elements */}
        {errors.length > 0 && (
          <ErrorList>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ErrorList>
        )}
        <SubmitButton type="submit">Add Movie</SubmitButton>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 500px;
  margin: 32px auto;
  padding: 32px;
`;

const ErrorList = styled.ul`
  color: red;
`;

const SubmitButton = styled.button`
  background: blue;
  color: yellow;
  font-weight: bold;
  font-family: inherit;
  font-size: 1.2rem;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

export default MovieForm;
