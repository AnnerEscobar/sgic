import { computed, ErrorHandler, Inject, inject, Injectable, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, checkTokenResponse, loginResponse, User } from '../interfaces';
import { isPlatformBrowser } from '@angular/common';
import { UserRegistro } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthStatus().subscribe();
    }
  }

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);
  private userId:string | null = null;

  //! Al mundo exterior
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  private setAuthentication(user: User, token: string): boolean {
    this._authStatus.set(AuthStatus.authenticated);
    this._currentUser.set(user);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user._id);
    return true
  }

  getUserId():string | null{
    return localStorage.getItem('userId');
  }



  login(email: string, password: string): Observable<boolean> {
    return this.http.post<loginResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        map(({ user, token, }) => this.setAuthentication(user, token,)),
        catchError(err => throwError(() => err.error.message)
        )
      );
  }


  register(body: UserRegistro): Observable<UserRegistro> {
    return this.http.post<UserRegistro>(`${this.baseUrl}/auth/register`, body)
      .pipe(
        catchError(err => throwError(() => err.error.message)
        ))
  }



  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.closeSesion();
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<checkTokenResponse>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false)
        })
      );
  }


  closeSesion() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }


}
