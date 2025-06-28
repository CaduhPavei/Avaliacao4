import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Player } from '../types/Player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly urlApi = 'http://172.16.85.232:3000/players';

  private http = inject(HttpClient);

  public salvar(player: Player) {
    if (player.id) {
      return this.http.put(`${this.urlApi}/${player.id}`, player);
    }
    const novoPlayer = { ...player };
    delete novoPlayer.id;

    return this.http.post(this.urlApi, novoPlayer);
  }

  public excluir(id: string) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  public buscarTodos(player: Player) {
    return this.http.get<Player[]>(this.urlApi);
  }

  public buscarPorId(id: string) {
    return this.http.get<Player>(`${this.urlApi}/${id}`);
  }
}
