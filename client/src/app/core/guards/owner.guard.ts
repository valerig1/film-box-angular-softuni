import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService, FilmsService } from "../services"
import { map } from "rxjs";

export const ownerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const filmsService = inject(FilmsService);
  const router = inject(Router);

  const filmId = route.params['id'];
  const userId = authService.getCurrentUserId();

  if (!userId) {
    return router.createUrlTree(['/login']);
  }

  return filmsService.getFilmById(filmId).pipe(
    map(film => {
      if (film._ownerId === userId) {
        return true;
      } else {
        return router.createUrlTree([`/films/${filmId}/details`]);
      }
    })
  );
}