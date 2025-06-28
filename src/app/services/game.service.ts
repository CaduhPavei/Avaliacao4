import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Game } from '../types/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly urlApi = 'http://172.16.85.232:3000/games';

  private http = inject(HttpClient);

  public salvar(game: Game) {
    if (game.id) {
      return this.http.put(`${this.urlApi}/${game.id}`, game);
    }
    const novoGame = { ...game };
    delete novoGame.id;

    return this.http.post(this.urlApi, novoGame);
  }

  public excluir(id: string) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  public buscarTodos() {
    return this.http.get<Game[]>(this.urlApi);
  }

  public buscarPorId(id: string) {
    return this.http.get<Game>(`${this.urlApi}/${id}`);
  }
}
