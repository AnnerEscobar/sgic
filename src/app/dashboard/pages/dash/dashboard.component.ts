import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';

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
  countByType: any = {};
  isLoading = true;

  tiposCaso: string[] = ['Maltrato', 'Alerta', 'Conflicto']

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
    this.getCountCasesByType();
  }

  getCountCasesByType(): void {
    this.dahsboardService.countCasesByTipe().subscribe({
      next: (data:[any]) => {
        // Transformamos el arreglo en un objeto con los tipos de casos como claves
        this.countByType = data.reduce((acc:any, item:any) => {
          acc[item.CaseTipo] = item.count;
          return acc;
        }, {});
        console.log(this.countByType)
      },
      error: err => {
        console.log('Error al contar casos por tipo', err);
      }
    });
  }

  /*  getCountCasesByType():void{
     this.dahsboardService.countCasesByTipe()
     .subscribe({
       next: data =>{
         this.countByType = data.reduce((acc, item) => {
           acc[item.CaseTipo] = item.count;
           return acc;
         });
         console.log(this.countByType)
       },
       error:(err) =>{
         console.log('Error al contar casos por tipo', err)
       }
     })
   } */
}
