import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashRoutingModule } from './dashboard/dash-routing.module';
import { RouterCaseModule } from './add-case/router-case.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    AuthRoutingModule,
    DashRoutingModule,
    RouterCaseModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aplication';
}
