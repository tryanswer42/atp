import {Component, OnInit, ViewChild} from '@angular/core';
import {Player} from '../player.module';
import {NgForm} from '@angular/forms';
import {PlayersService} from '../players.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  @ViewChild('f', {static: false}) playerForm: NgForm;
  player: Player;
  id: number;

  constructor(private playersService: PlayersService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = +param['id'];
      this.playersService.getPlayerById(this.id)
        .subscribe(player => {
        this.player = player;
        this.setPlayerForm();
      });
    });
  }

  setPlayerForm(): void {
    this.playerForm.setValue({
      id: this.player.id,
      name: this.player.name,
      country: this.player.country,
      age: this.player.age,
      points: this.player.point,
      tournaments: this.player.tournaments,
    });
  }

  onSubmit(): void {
    const player: Player = new Player(
      this.playerForm.value.name,
      this.playerForm.value.country,
      this.playerForm.value.age,
      this.playerForm.value.points,
      this.playerForm.value.tournaments,
      this.playerForm.value.id
    );
    this.playersService.updatePlayers(player).subscribe();
    this.location.back();
  }

  onClickBack(): void {
    this.location.back();
  }
}
