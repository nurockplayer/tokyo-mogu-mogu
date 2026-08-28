import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DataReviewBoardApp } from './DataReviewBoardApp';
import './styles.css';

createRoot(document.getElementById('data-review-root')!).render(
  <StrictMode>
    <DataReviewBoardApp />
  </StrictMode>,
);
