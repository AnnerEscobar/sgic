import { AuthService } from './auth/services/auth-service.service';
import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashRoutingModule } from './dashboard/dash-routing.module';
import { RouterCaseModule } from './add-case/router-case.module';
import { AuthStatus } from './auth/interfaces';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    AuthRoutingModule,
    DashRoutingModule,
    RouterCaseModule,
    CommonModule,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aplication';



  private authService = inject(AuthService);
  private router = inject(Router);



  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  public isAunthenticated = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.authenticated) {
      return true;
    }
    return false;
  });


  public authStatusChangedEffect = effect(() => {

    switch (this.authService.authStatus()) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }

  });


}
