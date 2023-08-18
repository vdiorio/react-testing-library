import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('Verifica se existe um heading com o texto Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);

  const heading = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(heading).toBeInTheDocument();
});

test('Verifica se a página mostra a imagem Pikachu crying', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByRole('img',
    { name: /Pikachu crying because the page requested was not found/i });
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
