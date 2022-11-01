import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user/model/user.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User=> {
 
      return context.switchToHttp().getRequest().user;
    
    
  },
);