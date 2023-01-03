import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// execution context is used to handle incoming http requests, web sockets, grpc, graphql

export const SpotifyToken = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.accessToken;
  }
);
