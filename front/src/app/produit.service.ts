import { Injectable } from '@angular/core';
import { Produit } from './produit';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public baseUrl = 'http://localhost:8000/api';
  public produits = 'http://localhost:8000/api/produits';

  constructor(private http: HttpClient) { }

  

  getProduits (): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.produits).pipe(
      tap(_ => console.log('fetched Produits')),
      catchError(this.handleError<Produit[]>('getProduits', []))
    );
  }

  createProduit(produit: Produit): Observable<any> {
    return this.http.post<Produit>('http://localhost:8000/api/produits', produit, httpOptions).pipe(
      tap((newProduit: Produit) => console.log(`added hero w/ id=${newProduit.id}`)),
      catchError(this.handleError<Produit>('create'))
    );
  }
  getProduit(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/produit/${id}`);
  }
  /*updateProduit(id: number, produit: Produit): Observable<any> {
    return this.http.put<Produit>(`https://localhost:8000/api/produit/${id}`, produit, httpOptions).pipe(
      tap((newProduit: Produit) => console.log(`added hero w/ id=${newProduit.id}`)),
      catchError(this.handleError<Produit>('create'))
    );
  }*/
  updateProduit(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/produit/${id}`, value);
  }

  deleteProduit(produit: Produit | number): Observable<Produit> {
    const id = typeof produit === 'number' ? produit : produit.id;
    const url = `${'http://127.0.0.1:8000/api/produit'}/${id}`;
    console.log(id);

    return this.http.delete<Produit>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Produit id=${id}`)),
      catchError(this.handleError<Produit>('delete'))
    );
  }
  getProduitsList(): Observable<any> {
    return this.http.get(`${this.produits}`);
  }
  
}
