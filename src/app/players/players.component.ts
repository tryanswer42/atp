import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Player} from './player.module';
import {PlayersService} from './players.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) searchForm: NgForm;
  topPlayers: Player[];
  topNumber = 3;
  subscription: Subscription;

  constructor(private playersService: PlayersService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.playersService.getTopPlayers(this.topNumber)
      .subscribe(topPayers => {
        this.topPlayers = topPayers;
      });
  }

  onSelectPlayer(player: Player): void {
    this.router.navigate(['/players', player.id, 'details']);
  }

  onSubmitSearch(): void {
    if (this.searchForm.value.searchName.trim().length === 0) {
      // message
      this.searchForm.resetForm();
    } else {
      this.router.navigate(['/players/search'], {queryParams: {searchName: this.searchForm.value.searchName}});
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
