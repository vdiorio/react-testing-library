import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Data from '../data';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);

  const nomePokemon = screen.getByTestId('pokemon-name');
  expect(nomePokemon).toBeInTheDocument();

  const tipoPokemon = screen.getByTestId('pokemon-type');
  expect(tipoPokemon).toBeInTheDocument();
  expect(tipoPokemon).toHaveTextContent('Electric');

  const pesoPokemon = screen.getByText(/average weight: 6\.0 kg/i);
  expect(pesoPokemon).toHaveTextContent('Average weight: 6.0 kg');

  const imagemPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(imagemPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);

  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${Data[0].id}`);
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  renderWithRouter(<App />);

  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);

  const checkBox = screen.getByText(/pokémon favoritado\?/i);
  userEvent.click(checkBox);

  const starzinha = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(starzinha).toHaveAttribute('src', '/star-icon.svg');
});
