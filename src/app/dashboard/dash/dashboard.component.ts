import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  public user = computed (()=> this.authService.currentUser());

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  tiposCaso: string[]=['Maltrato', 'Alerta', 'Conflicto', 'Total Casos']

  closeSesion(){
    this.authService.closeSesion();
  }

}
