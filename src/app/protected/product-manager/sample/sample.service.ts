/**
 * Copyright (c) 2024 DAZKON SOLUTIONS (DAZKON PVT LTD)
 * All rights reserved. 
 * This code is proprietary to DAZKON SOLUTIONS. 
 * Unauthorized use, reproduction, modification, distribution, or sale
 * without the explicit written permission of DAZKON SOLUTIONS is strictly prohibited.
 * For inquiries, please contact: info@dazkonsolutions.com
 */

import { 
  inject, 
  Injectable 
} from '@angular/core';
import { 
  BottomSheetService, 
  DialogService 
} from 'src/app/common/services';
import { 
  DeleteHandlerConfig, 
  DeleteHandlerService 
} from 'src/app/private/system/common/delete-handler';
import { CheckSampleDeletable, DeleteSample } from 'src/app/store/sample/data/sample.state';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  private dialogSvc = inject(DialogService);
  private deleteHandlerSvc = inject(DeleteHandlerService);
  private bottomSheetSvc = inject(BottomSheetService);

  async openForm(): Promise<void> {
    const { SampleComponent } = await import('./sample/sample.component');
    this.dialogSvc.open(SampleComponent, { });
  }

  async openFilter(): Promise<void> {
    const { SampleFilterComponent } = await import('./sample-filter/sample-filter.component');
    this.bottomSheetSvc.open(SampleFilterComponent);
  }

  delete(sample: any): void {
    const { id, name } = sample;
    const config: DeleteHandlerConfig = {
      checkActionInstance: new CheckSampleDeletable(id),
      deleteActionInstance: new DeleteSample(id),
      description: name
    };

    this.deleteHandlerSvc.handleDelete(config);
  }
}