import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class UniqueUsername implements AsyncValidator {

    constructor(
        private authService: AuthService
    ){}

    validate = (control: AbstractControl): Observable<ValidationErrors | null> =>  {
        const {value} = control;

        return this.authService.userNameAvailable(value).pipe(
            switchMap(val => {
                if (val.available){
                    return of(null);
                } else {
                    return of({ nonUniqueUsername: true})  
                }
            }),
            catchError(err => {
                if (err.error.username) {
                    return of({ nonUniqueUsername: true})  
                } else {
                   return of({ noConnection: true})    
                }
                  
            })
        )  
    }
}
