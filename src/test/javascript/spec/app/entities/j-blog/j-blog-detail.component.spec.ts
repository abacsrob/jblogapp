/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JblogappTestModule } from '../../../test.module';
import { JBlogDetailComponent } from 'app/entities/j-blog/j-blog-detail.component';
import { JBlog } from 'app/shared/model/j-blog.model';

describe('Component Tests', () => {
    describe('JBlog Management Detail Component', () => {
        let comp: JBlogDetailComponent;
        let fixture: ComponentFixture<JBlogDetailComponent>;
        const route = ({ data: of({ jBlog: new JBlog(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JblogappTestModule],
                declarations: [JBlogDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(JBlogDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(JBlogDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.jBlog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
