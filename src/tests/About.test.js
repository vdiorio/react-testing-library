import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('Testa se a página contém um heading com o texto About Pokedex', () => {
  renderWithRouter(<About />);

  const heading = screen.getByRole('heading', { name: /about pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const primeiroParagrafo = screen.getByText(/This application simulates a Pokédex/i);
  const segundoParagrafo = screen.getByText(/One can filter Pokémons by type/i);
  expect(primeiroParagrafo).toBeInTheDocument();
  expect(segundoParagrafo).toBeInTheDocument();
});

test('Testa se a página contém uma imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const image = screen.getByRole('img', { name: /pokédex/i });
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
