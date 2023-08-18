import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Verifica se o primeiro Link possui o texto Home', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: 'Home' });
  expect(home).toBeInTheDocument();
});

test('Verifica se o segundo Link possui o texto About', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: 'About' });
  expect(home).toBeInTheDocument();
});

test('Verifica se o segundo Link possui o texto Favorite Pokemons', () => {
  renderWithRouter(<App />);

  const home = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(home).toBeInTheDocument();
});

test('Verifica se o Link redireciona para a página inicial', () => {
  const { history } = renderWithRouter(<App />);

  // captar o link que deve redirecionar
  const homeButton = screen.getByRole('link', { name: 'Home' });
  userEvent.click(homeButton);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Verifica se o Link redireciona para a página About', () => {
  const { history } = renderWithRouter(<App />);

  // captar o link que deve redirecionar
  const homeButton = screen.getByRole('link', { name: 'About' });
  userEvent.click(homeButton);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Verifica se o Link redireciona para a página Pokémons Favoritados', () => {
  const { history } = renderWithRouter(<App />);

  // captar o link que deve redirecionar
  const homeButton = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(homeButton);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
