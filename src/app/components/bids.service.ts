import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class BidsService {
    constructor( private http: HttpClient) {}

    getBids() {
        return this.http.get<any>(`https://www.mercadobitcoin.net/api/BTC/orderbook/`).pipe(
            map(resp => {
                return {
                    asks: resp.asks.slice(0, 30),
                    bids: resp.bids.slice(0, 30)
                }
            })
        );
    }
}