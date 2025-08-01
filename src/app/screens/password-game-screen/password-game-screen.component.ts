import {Component, OnInit} from '@angular/core';
import {PasswordGameComponent} from "../../components/password-level/password-game/password-game.component";
import {getUuid} from "../../services/uuidService";
import {SearchService} from "../../modules/openapi/services/search.service";
import {LoginService} from "../../modules/openapi/services/login.service";
import {Router} from "@angular/router";
import {StageNavigatorService} from "../../services/stage-navigator.service";

@Component({
  selector: 'app-password-game-screen',
  templateUrl: './password-game-screen.component.html',
  styleUrl: './password-game-screen.component.scss',
  standalone: true,
  imports: [
    PasswordGameComponent
  ]
})
export class PasswordGameScreenComponent implements OnInit {

  constructor(
    private searchService: SearchService,
    private loginService: LoginService,
    private router: Router,
    private stageNavigator: StageNavigatorService,
  ) {
  }

  ngOnInit() {
    this.loginService.isAdminUser().subscribe(
      (result) => (result ? this.stageNavigator.routeToNextStage(getUuid()) : this.router.navigateByUrl("access-denied")),
      (_) => {
        this.router.navigate(['/access-denied'])
      }
    )
  }

}
