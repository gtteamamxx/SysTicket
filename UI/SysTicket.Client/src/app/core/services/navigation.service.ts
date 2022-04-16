import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class NavigationService {

    constructor(private router: Router) { }

    navigateToMainPage(): void {
        this.router.navigateByUrl('/');
    }

    navigateToLoginPage(): void {
        this.router.navigate(['login']);
    }
}