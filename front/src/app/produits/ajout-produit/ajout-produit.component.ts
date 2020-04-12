import { ProduitService } from '../../produit.service';
import { Produit } from '../../produit';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  produit: Produit = new Produit();
  submitted = false;

  constructor(private produitService: ProduitService,
    private router: Router) { }

  ngOnInit() {
  }

  newProduit(): void {
    this.submitted = false;
    this.produit = new Produit();
  }

  save() {
    this.produitService.createProduit(this.produit)
      .subscribe(data => console.log(data), error => console.log(error));
      console.log(this.produit);
    this.produit = new Produit();
    this.gotoList();   
  }

  onSubmit() {
    this.submitted = true;
      this.save();    
  }

  gotoList() {
    this.router.navigate(['/produits']);
  }

}
