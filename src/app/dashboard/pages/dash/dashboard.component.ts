import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private authService = inject(AuthService);
  private dahsboardService = inject(DashboardService);
  private toastr = inject(ToastrService);

  public user = computed(() => this.authService.currentUser());
  casos: any[] = [];
  isLoading = true;

  tiposCaso: string[] = ['Maltrato', 'Alerta', 'Conflicto', 'Total Casos']

  closeSesion() {
    this.authService.closeSesion();
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId) {
      this.dahsboardService.getCasesByUser(userId)
        .subscribe(data => {
          this.casos = data;
          this.isLoading = false;
        },
          (error) => {
            this.toastr.error(error, 'Error'),
              this.isLoading = false;
          }
        );

    } else {
      this.toastr.error('No se encontro ID', 'Error');
      this.isLoading = false;

    }
  }




}
