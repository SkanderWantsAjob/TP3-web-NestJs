import { Controller, Sse, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { GetUser } from 'src/auth/decorator';
import { JwtPayload } from 'src/auth/jwt-payload.interface';
import { eventType } from 'src/common/event.type';
import { JWTAuthGuard2 } from 'src/guards/authurl.guard';
@Controller('api')
export class MySseController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Sse('sse')
  @UseGuards(JWTAuthGuard2)
  sse(@GetUser() user: JwtPayload): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'persistence').pipe(
      filter((payload: eventType) => {
        console.log('id=',payload.user.id);
        console.log(user);
        
        return payload.user.id === user.id || user.role === 'admin';
      }),
      map((payload: eventType) => {
        console.log('persistence event');
        console.log({ payload });
        return new MessageEvent('persistence event', { data: payload });
      }),
    );
  }
}
