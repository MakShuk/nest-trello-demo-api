import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userIdParam = this.extractUserIdFromPath(request.path);

    if (userIdParam && userIdParam !== user.id.toString()) {
      throw new UnauthorizedException('User ID mismatch');
    }

    return true;
  }

  private extractUserIdFromPath(path: string): string | null {
    const match = path.match(/\/users\/(\d+)/);
    return match ? match[1] : null;
  }
}
