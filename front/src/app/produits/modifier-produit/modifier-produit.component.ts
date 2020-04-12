import { ProduitService } from '../../produit.service';
import { Produit } from "../../produit";
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {

  produit: Produit = new Produit();
  submitted = false;
  id:number;

  constructor(private route: ActivatedRoute,private produitService: ProduitService,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.produitService.getProduit(this.id)
      .subscribe(data => {
        console.log(data)
        this.produit = data;
      }, error => console.log(error));
  }

  newProduit(): void {
    this.submitted = false;
    this.produit = new Produit();
  }

  edit() {
    this.produitService.updateProduit(this.id, this.produit)
      .subscribe(data => console.log(data), error => console.log(error));
    this.produit = new Produit();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.edit();    
  }

  gotoList() {
    this.router.navigate(['/produits']);
  }


}
