import { Controller, Sse, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent } from 'rxjs';
import { map,filter } from 'rxjs/operators';
import { eventType } from 'src/common/event.type';
@Controller('api')
export class MySseController {
  constructor(private eventEmitter: EventEmitter2) {}
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'persistence').pipe(
      filter((payload: eventType) => {
        console.log(payload.user.id);console.log(payload.sender);
        
        return payload.user.id === payload.sender.id|| payload.sender.role === 'admin';
      }),
      map((payload: eventType) => {
        console.log('persistence event');
        console.log({ payload });
        return new MessageEvent('persistence event', { data: payload });
      }),
    );
  }
}



