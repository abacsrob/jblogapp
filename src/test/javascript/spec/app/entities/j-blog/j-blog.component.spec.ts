/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JblogappTestModule } from '../../../test.module';
import { JBlogComponent } from 'app/entities/j-blog/j-blog.component';
import { JBlogService } from 'app/entities/j-blog/j-blog.service';
import { JBlog } from 'app/shared/model/j-blog.model';

describe('Component Tests', () => {
    describe('JBlog Management Component', () => {
        let comp: JBlogComponent;
        let fixture: ComponentFixture<JBlogComponent>;
        let service: JBlogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JblogappTestModule],
                declarations: [JBlogComponent],
                providers: []
            })
                .overrideTemplate(JBlogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JBlogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JBlogService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new JBlog(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.jBlogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
