/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JblogappTestModule } from '../../../test.module';
import { JBlogUpdateComponent } from 'app/entities/j-blog/j-blog-update.component';
import { JBlogService } from 'app/entities/j-blog/j-blog.service';
import { JBlog } from 'app/shared/model/j-blog.model';

describe('Component Tests', () => {
    describe('JBlog Management Update Component', () => {
        let comp: JBlogUpdateComponent;
        let fixture: ComponentFixture<JBlogUpdateComponent>;
        let service: JBlogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JblogappTestModule],
                declarations: [JBlogUpdateComponent]
            })
                .overrideTemplate(JBlogUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(JBlogUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(JBlogService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JBlog(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jBlog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new JBlog();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.jBlog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
