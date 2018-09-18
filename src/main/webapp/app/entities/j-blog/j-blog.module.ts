import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JblogappSharedModule } from 'app/shared';
import {
    JBlogComponent,
    JBlogDetailComponent,
    JBlogUpdateComponent,
    JBlogDeletePopupComponent,
    JBlogDeleteDialogComponent,
    jBlogRoute,
    jBlogPopupRoute
} from './';

const ENTITY_STATES = [...jBlogRoute, ...jBlogPopupRoute];

@NgModule({
    imports: [JblogappSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [JBlogComponent, JBlogDetailComponent, JBlogUpdateComponent, JBlogDeleteDialogComponent, JBlogDeletePopupComponent],
    entryComponents: [JBlogComponent, JBlogUpdateComponent, JBlogDeleteDialogComponent, JBlogDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JblogappJBlogModule {}
