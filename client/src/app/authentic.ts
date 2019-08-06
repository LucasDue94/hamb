import { AuthService } from "./core/auth/auth.service";

export abstract class Authentic {

  private authService = new AuthService();

  abstract checkPermission = (permission: string) => this.authService.hasPermission(permission);
}
