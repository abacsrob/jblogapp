import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JblogappJBlogModule } from './j-blog/j-blog.module';
import { JblogappBlogModule } from './blog/blog.module';
import { JblogappEntryModule } from './entry/entry.module';
import { JblogappTagModule } from './tag/tag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JblogappJBlogModule,
        JblogappBlogModule,
        JblogappEntryModule,
        JblogappTagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JblogappEntityModule {}
