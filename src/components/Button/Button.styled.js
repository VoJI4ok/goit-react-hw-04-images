import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  padding: 5px 10px;
  font-size: 15px;
  font-weight: 600;
  margin: 20px auto;
  border-radius: 5px;
  border: none;
  background-color: #ddd;
  color: #333;
  cursor: pointer;
  transition: background-color 300ms linear, color 300ms linear;

  &:hover {
    background-color: #4b98f5;
    color: #eee;
  }
`;
