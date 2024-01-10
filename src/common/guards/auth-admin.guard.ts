import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from 'src/core/enums/user.role';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return await this.validateRequest(req);
  }

  async validateRequest(req: any): Promise<boolean> {
    try {
      if (req['user'].role === UserRole.Admin) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
