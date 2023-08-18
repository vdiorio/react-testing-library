import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Verifica "No favorite pokemon found" se não tiver pokémon favoritos.', () => {
  renderWithRouter(<App />);

  const favoritesButton = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoritesButton);

  const semPokemons = screen.getByText(/no favorite pokemon found/i);
  expect(semPokemons).toBeInTheDocument();
});

test('Verifica os cards quando tiver pokémons favoritos.', () => {
  renderWithRouter(<App />);
  // clicar em home
  const clickHome = screen.getByRole('link', { name: /home/i });
  userEvent.click(clickHome);
  // clicar em um tipo e gerar um pokemon aleatório
  const gerarPokemon = screen.getByRole('button', { name: /fire/i });
  userEvent.click(gerarPokemon);
  // clicar em mais detalhes
  const maisDetalhes = screen.getByRole('link', { name: /more details/i });
  userEvent.click(maisDetalhes);
  // clicar em favoritar o pokemon
  const favoritarOPokemon = screen.getByText(/pokémon favoritado\?/i);
  userEvent.click(favoritarOPokemon);
  // voltar para a pagina de favoritos
  const voltarParaFavoritos = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(voltarParaFavoritos);
  // verificar se o card tá lá
  const pokemonFavoritado = screen.getByTestId('pokemon-name');
  expect(pokemonFavoritado).toBeInTheDocument();
});
