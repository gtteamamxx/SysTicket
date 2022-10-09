import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

interface ImagesFormGroup {
  logo: FormControl<File | null>;
}

export interface ImagesStepData {
  logo: File;
}

const NO_IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImagesComponent implements OnInit, OnDestroy {
  get isValid(): boolean {
    return this.imagesFormGroup.valid;
  }

  previewImageSrc: any = NO_IMAGE_URL;

  imagesFormGroup = new FormGroup<ImagesFormGroup>({
    logo: new FormControl<File>(null!, [Validators.required]),
  });

  private subscription!: Subscription;

  constructor(private readonly sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.imagesFormGroup.controls.logo.valueChanges.subscribe((image: File | null) => {
      if (image == null) {
        this.previewImageSrc = NO_IMAGE_URL;
      } else {
        this.previewImageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(image));
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getStepData(): ImagesStepData {
    return {
      logo: this.imagesFormGroup.controls.logo.value!,
    };
  }
}
