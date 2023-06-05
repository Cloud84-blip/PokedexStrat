import Pokemon from "../Pokemon";
import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';


it("should render the correct name", () => {
    render(<Pokemon name="Pikachu" />);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
});