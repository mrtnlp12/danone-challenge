import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  product: any = {};
  id: string = '';
  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            product(id: "${this.id}") {
              name
              description
              imageUrl
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.product = result.data && result.data.product;
      });
  }
}
