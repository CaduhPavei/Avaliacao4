import { Component, inject, Input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCardContent,
  IonCard,
  IonCardTitle,
  ModalController,
  IonCardHeader,
  IonItem,
  IonInput, IonButton, IonIcon, IonList, IonLabel } from '@ionic/angular/standalone';
import { Game } from '../types/Game';
import { Player } from './../types/Player';
import { PlayerService } from '../services/player.service';
import { GameService } from './../services/game.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonLabel, IonList, IonIcon, IonButton, 
    IonInput,
    IonItem,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class HomePage implements OnInit {
  @Input() player!: Player;
  @Input() game!: Game;

  private playerService = inject(PlayerService);
  private gameService = inject(GameService);
  private modalController = inject(ModalController);

  public players: Player[] = [];

  ngOnInit() {
    this.carregarPlayers();

    if (!this.player) {
      this.player = {
        id: '',
        nome: '',
        game: {},
      };
    }
  }

  private carregarPlayers() {
    this.playerService.buscarTodos(this.player).subscribe(() => {
      this.modalController.dismiss();
    });
  }

  public salvar() {
    this.playerService.salvar(this.player).subscribe(() => {

    });
  }
  private router = inject(Router); 

  public iniciar() {
    this.playerService.buscarTodos(this.player).subscribe((players) => {
      if (players && players.length > 0) {
        
        this.router.navigate(['/inicio']); 
      } else {
        console.warn('Cadastre-se antes de iniciar');
      }
    });
}
}
