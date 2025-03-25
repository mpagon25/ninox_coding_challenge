import styled from 'styled-components';

export const StyledGifModalDetails = {
  Overlay: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9); /* Dark overlay background */
    color: var(--text-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: var(--surface-color); /* Card-like background */
    border-radius: var(--border-radius); /* Rounded corners */
    box-shadow: var(--box-shadow); /* Subtle shadow for depth */
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    text-align: left;
  `,
  Title: styled.h3`
    font-size: 1.5rem;
    color: var(--primary-color); /* Accent color for the title */
    margin-bottom: 1rem;
  `,
  UserName: styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);

    strong {
      color: var(--secondary-color); /* Highlight key labels */
    }
  `,
  ImportDateTime: styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);

    strong {
      color: var(--secondary-color);
    }
  `,
  Rating: styled.p`
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);

    strong {
      color: var(--secondary-color);
    }
  `,
  SourceText: styled.span`
    font-size: 1rem;
    color: var(--text-primary);
  `,
  Source: styled.a`
    font-size: 1rem;
    color: var(--primary-color); /* Accent color for links */
    text-decoration: none;

    &:hover {
      text-decoration: underline; /* Underline on hover for better UX */
    }
  `,
  CloseButton: styled.button`
    font-size: 1.125rem;
    margin-top: 1rem; /* Add space between content and button */
    padding: 0.5rem 1rem; /* Padding for clickable area */
    background-color: var(--primary-color); /* Primary color for button */
    color: var(--surface-color); /* Text color for contrast */
    border: none; /* Remove default border */
    border-radius: var(--border-radius); /* Rounded corners */
    cursor: pointer; /* Show pointer on hover */
  `,
};
