import { Component } from '@angular/core';
import {PasswordGameComponent} from "../../components/password-level/password-game/password-game.component";

@Component({
  selector: 'app-password-game-screen',
  templateUrl: './password-game-screen.component.html',
  styleUrl: './password-game-screen.component.scss',
  standalone: true,
  imports: [
    PasswordGameComponent
  ]
})
export class PasswordGameScreenComponent {

}
