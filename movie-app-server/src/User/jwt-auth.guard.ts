import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header missing');
        }

        const token = authHeader.replace('Bearer ', '');
        try {
            const payload = this.jwtService.verify(token, { secret: process.env.SECRET_KEY });
            req.user = payload; // Attach user to request
            req.user._id = payload.sub
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
