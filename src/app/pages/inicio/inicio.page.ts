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
  ModalController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';
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
  @Input() game!: Game;

  private router = inject(Router);
  private playerService = inject(PlayerService);
  private gameService = inject(GameService);
  private modalController = inject(ModalController);

  constructor() {}

  ngOnInit() {}

  public salvarPlayer() {
    this.playerService.salvar(this.player).subscribe(() => {});
  }

  public salvarGame() {
    this.gameService.salvar(this.game).subscribe(() => {});
  }
}
