import {Component, OnInit, ViewChild} from '@angular/core';
import {Player} from '../player.module';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlayersService} from '../players.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @ViewChild('f', {static: false}) addForm: NgForm;
  viewAddForm = false;
  searchMode = false;
  deleteMode = false;
  searchedName = '';
  players: Player[];


  constructor(private route: ActivatedRoute,
              private playersService: PlayersService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['searchName']) {
      this.searchMode = true;
      this.searchedName = this.route.snapshot.queryParams['searchName'];
    }
    this.route.params
      .subscribe((params: Params) => {
        if (this.route.snapshot.queryParams['searchName']) {
          this.searchMode = true;
          this.searchedName = this.route.snapshot.queryParams['searchName'];
        }
        this.playersResultTable();
      });
  }

  onViewAddForm(): void {
    this.viewAddForm = !this.viewAddForm;
  }

  playersResultTable(): void {
    if (this.searchMode) {
      this.playersService.getPlayerByName(this.searchedName)
        .subscribe(
          searchedPlayers => {
            this.players = searchedPlayers;
          });
    } else {
      this.playersService.getPlayers()
        .subscribe(allPlayers => this.players = allPlayers
        );
    }
  }

  onDeletePlayer(player: Player): void {
    this.deleteMode = true;
    this.playersService.deletePlayer(player)
      .subscribe(playerDeleted => {
        this.players.splice(this.players.indexOf(player), 1);
      });
  }

  onSubmitPlayer(): void {
    const player: Player = new Player(
      this.addForm.value.name,
      this.addForm.value.country,
      this.addForm.value.age,
      this.addForm.value.points,
      this.addForm.value.tournaments
    );
    this.playersService.addPlayer(player)
      .subscribe((player: Player) => {
          this.players.push(player);
          this.addForm.reset();
          this.viewAddForm = false;
        }
      );
  }

  onSelectPlayer(player: Player): void {
    if (this.deleteMode) {
      // Skip select and run delete
      this.deleteMode = false;
    } else {
      this.router.navigate(['/players', player.id, 'details']);
    }
  }


}
