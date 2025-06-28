// inicio.page.ts
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/types/Game';
import { Player } from 'src/app/types/Player';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class InicioPage implements OnInit {
  @Input() player!: Player;

  private router = inject(Router);
  private gameService = inject(GameService);

  ngOnInit() {
    if (!this.player?.id) {
      console.error('Jogador não definido ou sem ID');
      this.router.navigate(['/home']);
      return;
    }

    const newGame: Game = {
      fase: 'inicio',
      player: { id: this.player.id },
    };

    this.gameService.salvar(newGame).subscribe({
      next: (savedGame: Game) => {
        console.log('Jogo salvo com sucesso:', savedGame);
        if (savedGame.id) {
          this.player.game = { id: savedGame.id };
        }
      },
      error: (err) => {
        console.error('Erro ao salvar jogo:', err);
      },
    });
  }
}
