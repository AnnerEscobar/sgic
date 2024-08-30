import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { DashboardService } from '../../services/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import {saveAs} from 'file-saver';

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
      next: (data: [any]) => {
        // Transformamos el arreglo en un objeto con los tipos de casos como claves
        this.countByType = data.reduce((acc: any, item: any) => {
          acc[item.CaseTipo] = item.count;
          return acc;
        }, {});
      },
      error: err => {
      }
    });
  }

 /*  downloadFile(deicNumber: string): void {
    this.dahsboardService.downloadFile(deicNumber).subscribe(
      (response: Blob) => {
        const filename = `${deicNumber}.pdf`; // Cambia la extensión si es necesario
        saveAs(response, filename);
      },
      error => {
        console.error('Error al descargar el archivo', error);
      }
    );
  } */

    downloadFile(deicNumber: string) {
      this.dahsboardService.downloadFile(deicNumber).subscribe(blob => {
        // Crear un objeto URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crear un enlace temporal y hacer clic en él para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = deicNumber; // Ajusta el nombre del archivo si es necesario
        a.click();

        // Liberar el objeto URL
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error al descargar el archivo', error);
      });
    }
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
