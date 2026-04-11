import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services";

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAccessToken();

    if (!token) {
        return next(req);
    }

    const authReq = req.clone({
        setHeaders: {
            'X-Authorization': token
        }
    });

    return next(authReq);
};