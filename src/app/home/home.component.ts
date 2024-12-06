import { Component } from '@angular/core';
import { Entity } from '../models/entity';
import { entityService } from '../service/entity/entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private entityService: entityService) {}

  title = 'this is the tile of the home';

  createEntity() {
    // Prepare the entity object
    const newEntity: Entity = {
      type: 0,
      name: 'John Doe',
      birthDate: '2024-11-29T10:08:33.942Z', // Ensure the date is in the correct format
      level: 0, // Replace with a valid `Level`
      ownerID: '81a9d1b7-2d4c-4520-944c-36e129447c26',
    };

    this.entityService.postEntity(newEntity).subscribe({
      next: (response) => {
        console.log('Entity created successfully:', response, newEntity);
      },
      error: (error) => {
        console.error('Error creating entity:', error);
      },
    });
  }
}
