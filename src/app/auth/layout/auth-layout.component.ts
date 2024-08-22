import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
