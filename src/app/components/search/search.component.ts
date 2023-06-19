import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  products: any[] = [];
  @Output() searchEvent = new EventEmitter<any[]>();

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  search(input: HTMLInputElement) {
    if (input.value.length < 0) return;

    this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            productCollection(where: { name_contains: "${input.value.trim()}" }) {
              items {
                name
                description
                imageUrl
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result) => {
        this.products = result.data && result.data.productCollection.items;

        input.value = '';
        this.searchEvent.emit(this.products);
      });
  }
}
