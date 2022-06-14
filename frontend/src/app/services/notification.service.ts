import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable()
export class NotificationService {

    constructor(private socket: Socket) { }

    getMessage() {
        return this.socket.fromEvent('json').subscribe((data) => {
            console.log(data)
        });
    }

    connect() {
        const data = {
            'online': true,
            'id': JSON.parse(localStorage.getItem('id') || '')
        }
        this.socket.emit('message', { data: data })
    }

    checkConnection() {
        return this.socket.fromEvent('my response').subscribe((data) => {
            console.log(data)
        })
    }

    checkDissconnect() {
        const data = {
            'online': false,
            'id': JSON.parse(localStorage.getItem('id') || '')
        }
        this.socket.emit('message', { data: data })
    }
}