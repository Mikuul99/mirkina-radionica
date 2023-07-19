import { Component, Input } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: 'MyApp' | undefined

  section;
  hamburgerBtn: boolean = false;

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  onOutletLoaded(component) {
    if (component instanceof LandingComponent) {
      this.section = component.landing;
      console.log(this.section);

    }
  }

  hamburgerMenu() {
    this.hamburgerBtn = !this.hamburgerBtn;
  }
}
