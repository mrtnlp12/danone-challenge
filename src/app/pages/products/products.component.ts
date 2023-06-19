import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query {
            productCollection {
              items {
                sys {
                  id
                }
                name
                description
                imageUrl
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.products = result.data && result.data.productCollection.items;
      });
  }
  search(products: any[]) {
    this.products = products;
  }
}
