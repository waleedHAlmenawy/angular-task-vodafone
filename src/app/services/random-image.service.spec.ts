import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RandomImageService } from './random-image.service';

describe('RandomImageService', () => {
  let randomImage: RandomImageService;
  let testController: HttpTestingController;
  const url = 'https://api.api-ninjas.com/v1/randomimage?category=';
  const category = 'nature';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RandomImageService],
    });

    randomImage = TestBed.inject(RandomImageService);
    testController = TestBed.inject(HttpTestingController);
  });

  it('data service should be created', () => {
    expect(randomImage).toBeTruthy();
  });

  it('random image service should get a random image', () => {
    const mockBlob = new Blob([''], { type: 'image/jpeg' });

    randomImage.fetchImage(category).subscribe({
      next: (ranImg: any) => {
        expect(ranImg).toBeTruthy();
      },
    });

    const mockReq = testController.expectOne(url + category);
    expect(mockReq.request.method).toBe('GET');

    mockReq.flush(mockBlob);
  });
});
