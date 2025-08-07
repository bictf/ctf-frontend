import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../modules/openapi/services/login.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-cookie-skip-page',
  standalone: true,
  imports: [],
  templateUrl: './cookie-skip-page.component.html',
  styleUrl: './cookie-skip-page.component.scss'
})
export class CookieSkipPageComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookieService: CookieService,
    ) { }

  ngOnInit(): void {
    this.loginService.pleaseGetMeAdmin().subscribe(new_cookie => {
      this.cookieService.set('user', new_cookie);
      this.router.navigate(['/gooloog']);
    })
  }

}
